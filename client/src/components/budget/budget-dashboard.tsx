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

    const categories = convertedBudget.categories as Record<string, number> || {};
    const summary: BudgetSummary[] = Object.entries(categories).map(([category, budgetAmount]) => {
      const spent = convertedExpenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

      const remaining = budgetAmount - spent;
      const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;

      let status: 'good' | 'warning' | 'over' = 'good';
      if (percentage > 100) status = 'over';
      else if (percentage > 80) status = 'warning';

      return {
        category,
        budgeted: budgetAmount,
        spent,
        remaining,
        percentage,
        status,
      };
    });

    setBudgetSummary(summary);
  }, [convertedBudget, convertedExpenses]);

  if (!convertedBudget) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Budget Set</h3>
          <p className="text-muted-foreground mb-4">
            Create a budget to track your expenses for this trip.
          </p>
          <Button onClick={onAddExpense}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Budget
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totalSpent = budgetSummary.reduce((sum, item) => sum + item.spent, 0);
  const totalBudget = parseFloat(convertedBudget.totalBudget);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const pieData = budgetSummary.map(item => ({
    name: item.category,
    value: item.spent,
    color: CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.other,
  }));

  const barData = budgetSummary.map(item => ({
    category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    budgeted: item.budgeted,
    spent: item.spent,
  }));

  return (
    <div className="space-y-6">
      {/* Overall Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currencyService.formatCurrency(totalBudget, userCurrency)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currencyService.formatCurrency(totalSpent, userCurrency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {overallPercentage.toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            {totalRemaining >= 0 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currencyService.formatCurrency(Math.abs(totalRemaining), userCurrency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetSummary.length}</div>
            <p className="text-xs text-muted-foreground">
              Budget categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetSummary.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.other }}
                    />
                    <span className="font-medium capitalize">{item.category}</span>
                    <Badge variant={item.status === 'good' ? 'default' : item.status === 'warning' ? 'secondary' : 'destructive'}>
                      {item.status === 'good' ? 'On track' : item.status === 'warning' ? 'Warning' : 'Over budget'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currencyService.formatCurrency(item.spent, userCurrency)} / {currencyService.formatCurrency(item.budgeted, userCurrency)}
                  </div>
                </div>
                <Progress 
                  value={Math.min(item.percentage, 100)} 
                  className={item.status === 'over' ? 'bg-red-100' : ''}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => currencyService.formatCurrency(value as number, userCurrency)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget vs Spent Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => currencyService.formatCurrency(value as number, userCurrency)} />
                <Legend />
                <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
                <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onAddExpense}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
        <Button variant="outline" onClick={onViewDetails}>
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </div>
  );
}