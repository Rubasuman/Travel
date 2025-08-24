import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  PlusCircle,
  Eye
} from 'lucide-react';
import { currencyService } from '@/lib/currency';
import type { Budget, Expense } from '@shared/schema';

interface BudgetDashboardProps {
  tripId: number;
  userCurrency?: string;
  onAddExpense?: () => void;
  onViewDetails?: () => void;
}

interface BudgetSummary {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'good' | 'warning' | 'over';
}

const CATEGORY_COLORS = {
  accommodation: '#3B82F6',
  food: '#EF4444', 
  transport: '#10B981',
  activities: '#F59E0B',
  shopping: '#8B5CF6',
  other: '#6B7280',
};

export function BudgetDashboard({ tripId, userCurrency = 'USD', onAddExpense, onViewDetails }: BudgetDashboardProps) {
  const [convertedBudget, setConvertedBudget] = useState<Budget | null>(null);
  const [convertedExpenses, setConvertedExpenses] = useState<Expense[]>([]);
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary[]>([]);

  // Fetch budget data
  const { data: budget } = useQuery<Budget>({
    queryKey: ['/api/trips', tripId, 'budget'],
    queryFn: () => fetch(`/api/trips/${tripId}/budget`).then(res => res.json()),
    enabled: !!tripId,
  });

  // Fetch expenses
  const { data: expenses = [] } = useQuery<Expense[]>({
    queryKey: ['/api/trips', tripId, 'expenses'],
    queryFn: () => fetch(`/api/trips/${tripId}/expenses`).then(res => res.json()),
    enabled: !!tripId,
  });

  // Convert budget and expenses to user's preferred currency
  useEffect(() => {
    const convertData = async () => {
      if (!budget) return;

      try {
        // Convert budget
        if (budget.currency !== userCurrency) {
          const totalBudgetConverted = await currencyService.convertCurrency(
            parseFloat(budget.totalBudget),
            budget.currency,
            userCurrency
          );

          const categoriesConverted: Record<string, number> = {};
          if (budget.categories && typeof budget.categories === 'object') {
            const categories = budget.categories as Record<string, number>;
            for (const [category, amount] of Object.entries(categories)) {
              categoriesConverted[category] = await currencyService.convertCurrency(
                amount,
                budget.currency,
                userCurrency
              );
            }
          }

          setConvertedBudget({
            ...budget,
            totalBudget: totalBudgetConverted.toString(),
            currency: userCurrency,
            categories: categoriesConverted,
          });
        } else {
          setConvertedBudget(budget);
        }

        // Convert expenses
        const convertedExpensesList = await Promise.all(
          expenses.map(async (expense) => {
            if (expense.currency !== userCurrency) {
              const convertedAmount = await currencyService.convertCurrency(
                parseFloat(expense.amount),
                expense.currency,
                userCurrency
              );
              return {
                ...expense,
                amount: convertedAmount.toString(),
                originalAmount: expense.amount,
                originalCurrency: expense.currency,
                currency: userCurrency,
              };
            }
            return expense;
          })
        );

        setConvertedExpenses(convertedExpensesList);
      } catch (error) {
        console.error('Error converting currency:', error);
        setConvertedBudget(budget);
        setConvertedExpenses(expenses);
      }
    };

    convertData();
  }, [budget, expenses, userCurrency]);

  // Calculate budget summary
  useEffect(() => {
    if (!convertedBudget || !convertedExpenses) return;

    const categories = convertedBudget.categories as Record<string, number> || {};\n    const summary: BudgetSummary[] = Object.entries(categories).map(([category, budgetAmount]) => {\n      const spent = convertedExpenses\n        .filter(expense => expense.category === category)\n        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);\n\n      const remaining = budgetAmount - spent;\n      const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;\n\n      let status: 'good' | 'warning' | 'over' = 'good';\n      if (percentage > 100) status = 'over';\n      else if (percentage > 80) status = 'warning';\n\n      return {\n        category,\n        budgeted: budgetAmount,\n        spent,\n        remaining,\n        percentage,\n        status,\n      };\n    });\n\n    setBudgetSummary(summary);\n  }, [convertedBudget, convertedExpenses]);\n\n  if (!convertedBudget) {\n    return (\n      <Card>\n        <CardContent className=\"py-8 text-center\">\n          <DollarSign className=\"mx-auto h-12 w-12 text-muted-foreground mb-4\" />\n          <h3 className=\"text-lg font-medium mb-2\">No Budget Set</h3>\n          <p className=\"text-muted-foreground mb-4\">\n            Create a budget to track your expenses for this trip.\n          </p>\n          <Button onClick={onAddExpense}>\n            <PlusCircle className=\"w-4 h-4 mr-2\" />\n            Create Budget\n          </Button>\n        </CardContent>\n      </Card>\n    );\n  }\n\n  const totalSpent = budgetSummary.reduce((sum, item) => sum + item.spent, 0);\n  const totalBudget = parseFloat(convertedBudget.totalBudget);\n  const totalRemaining = totalBudget - totalSpent;\n  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;\n\n  const pieData = budgetSummary.map(item => ({\n    name: item.category,\n    value: item.spent,\n    color: CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.other,\n  }));\n\n  const barData = budgetSummary.map(item => ({\n    category: item.category.charAt(0).toUpperCase() + item.category.slice(1),\n    budgeted: item.budgeted,\n    spent: item.spent,\n  }));\n\n  return (\n    <div className=\"space-y-6\">\n      {/* Overall Budget Summary */}\n      <div className=\"grid grid-cols-1 md:grid-cols-4 gap-4\">\n        <Card>\n          <CardHeader className=\"flex flex-row items-center justify-between space-y-0 pb-2\">\n            <CardTitle className=\"text-sm font-medium\">Total Budget</CardTitle>\n            <DollarSign className=\"h-4 w-4 text-muted-foreground\" />\n          </CardHeader>\n          <CardContent>\n            <div className=\"text-2xl font-bold\">\n              {currencyService.formatCurrency(totalBudget, userCurrency)}\n            </div>\n          </CardContent>\n        </Card>\n\n        <Card>\n          <CardHeader className=\"flex flex-row items-center justify-between space-y-0 pb-2\">\n            <CardTitle className=\"text-sm font-medium\">Total Spent</CardTitle>\n            <TrendingUp className=\"h-4 w-4 text-muted-foreground\" />\n          </CardHeader>\n          <CardContent>\n            <div className=\"text-2xl font-bold\">\n              {currencyService.formatCurrency(totalSpent, userCurrency)}\n            </div>\n            <p className=\"text-xs text-muted-foreground\">\n              {overallPercentage.toFixed(1)}% of budget\n            </p>\n          </CardContent>\n        </Card>\n\n        <Card>\n          <CardHeader className=\"flex flex-row items-center justify-between space-y-0 pb-2\">\n            <CardTitle className=\"text-sm font-medium\">Remaining</CardTitle>\n            {totalRemaining >= 0 ? (\n              <TrendingDown className=\"h-4 w-4 text-green-600\" />\n            ) : (\n              <AlertTriangle className=\"h-4 w-4 text-red-600\" />\n            )}\n          </CardHeader>\n          <CardContent>\n            <div className={`text-2xl font-bold ${\n              totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'\n            }`}>\n              {currencyService.formatCurrency(Math.abs(totalRemaining), userCurrency)}\n            </div>\n            <p className=\"text-xs text-muted-foreground\">\n              {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}\n            </p>\n          </CardContent>\n        </Card>\n\n        <Card>\n          <CardHeader className=\"flex flex-row items-center justify-between space-y-0 pb-2\">\n            <CardTitle className=\"text-sm font-medium\">Budget Health</CardTitle>\n            {overallPercentage <= 80 ? (\n              <CheckCircle className=\"h-4 w-4 text-green-600\" />\n            ) : (\n              <AlertTriangle className=\"h-4 w-4 text-yellow-600\" />\n            )}\n          </CardHeader>\n          <CardContent>\n            <Progress value={Math.min(overallPercentage, 100)} className=\"mb-2\" />\n            <p className=\"text-xs text-muted-foreground\">\n              {overallPercentage <= 80 \n                ? 'On track' \n                : overallPercentage <= 100 \n                ? 'Approaching limit' \n                : 'Over budget'\n              }\n            </p>\n          </CardContent>\n        </Card>\n      </div>\n\n      {/* Category Breakdown */}\n      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">\n        <Card>\n          <CardHeader>\n            <CardTitle>Spending by Category</CardTitle>\n          </CardHeader>\n          <CardContent>\n            <ResponsiveContainer width=\"100%\" height={300}>\n              <PieChart>\n                <Pie\n                  data={pieData}\n                  cx=\"50%\"\n                  cy=\"50%\"\n                  labelLine={false}\n                  outerRadius={80}\n                  fill=\"#8884d8\"\n                  dataKey=\"value\"\n                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}\n                >\n                  {pieData.map((entry, index) => (\n                    <Cell key={`cell-${index}`} fill={entry.color} />\n                  ))}\n                </Pie>\n                <Tooltip formatter={(value) => currencyService.formatCurrency(value as number, userCurrency)} />\n              </PieChart>\n            </ResponsiveContainer>\n          </CardContent>\n        </Card>\n\n        <Card>\n          <CardHeader>\n            <CardTitle>Budget vs Actual</CardTitle>\n          </CardHeader>\n          <CardContent>\n            <ResponsiveContainer width=\"100%\" height={300}>\n              <BarChart data={barData}>\n                <CartesianGrid strokeDasharray=\"3 3\" />\n                <XAxis dataKey=\"category\" />\n                <YAxis formatter={(value) => currencyService.formatCurrency(value, userCurrency)} />\n                <Tooltip formatter={(value) => currencyService.formatCurrency(value as number, userCurrency)} />\n                <Legend />\n                <Bar dataKey=\"budgeted\" fill=\"#3B82F6\" name=\"Budgeted\" />\n                <Bar dataKey=\"spent\" fill=\"#EF4444\" name=\"Spent\" />\n              </BarChart>\n            </ResponsiveContainer>\n          </CardContent>\n        </Card>\n      </div>\n\n      {/* Category Details */}\n      <Card>\n        <CardHeader>\n          <div className=\"flex items-center justify-between\">\n            <CardTitle>Category Breakdown</CardTitle>\n            <div className=\"flex gap-2\">\n              <Button variant=\"outline\" size=\"sm\" onClick={onViewDetails}>\n                <Eye className=\"w-4 h-4 mr-2\" />\n                View Details\n              </Button>\n              <Button size=\"sm\" onClick={onAddExpense}>\n                <PlusCircle className=\"w-4 h-4 mr-2\" />\n                Add Expense\n              </Button>\n            </div>\n          </div>\n        </CardHeader>\n        <CardContent>\n          <div className=\"space-y-4\">\n            {budgetSummary.map((item) => (\n              <div key={item.category} className=\"space-y-2\">\n                <div className=\"flex items-center justify-between\">\n                  <div className=\"flex items-center gap-2\">\n                    <h4 className=\"font-medium capitalize\">{item.category}</h4>\n                    <Badge \n                      variant={item.status === 'good' ? 'default' : item.status === 'warning' ? 'destructive' : 'destructive'}\n                    >\n                      {item.status === 'good' ? 'On Track' : item.status === 'warning' ? 'Warning' : 'Over Budget'}\n                    </Badge>\n                  </div>\n                  <div className=\"text-right\">\n                    <div className=\"font-medium\">\n                      {currencyService.formatCurrency(item.spent, userCurrency)} / {currencyService.formatCurrency(item.budgeted, userCurrency)}\n                    </div>\n                    <div className=\"text-sm text-muted-foreground\">\n                      {currencyService.formatCurrency(Math.abs(item.remaining), userCurrency)} {item.remaining >= 0 ? 'remaining' : 'over'}\n                    </div>\n                  </div>\n                </div>\n                <Progress \n                  value={Math.min(item.percentage, 100)} \n                  className={item.status === 'over' ? 'bg-red-100' : ''}\n                />\n              </div>\n            ))}\n          </div>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}"