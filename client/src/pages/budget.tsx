import { useState } from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BudgetDashboard } from '@/components/budget/budget-dashboard';
import { AddExpenseForm } from '@/components/budget/add-expense-form';
import { ArrowLeft, DollarSign, Plus, Calculator } from 'lucide-react';
import { Link } from 'wouter';
import type { Trip, Budget, Expense } from '@shared/schema';

export function BudgetPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showCreateBudget, setShowCreateBudget] = useState(false);
  const [userCurrency] = useState('USD'); // This could come from user preferences

  const tripIdNum = tripId ? parseInt(tripId) : 0;

  // Fetch trip details
  const { data: trip } = useQuery<Trip>({
    queryKey: ['/api/trips', tripIdNum],
    queryFn: () => fetch(`/api/trips/${tripIdNum}`).then(res => res.json()),
    enabled: !!tripIdNum,
  });

  // Fetch budget
  const { data: budget } = useQuery<Budget | null>({
    queryKey: ['/api/trips', tripIdNum, 'budget'],
    queryFn: () => fetch(`/api/trips/${tripIdNum}/budget`).then(res => {
      if (res.status === 404) return null;
      return res.json();
    }),
    enabled: !!tripIdNum,
  });

  // Fetch expenses
  const { data: expenses = [] } = useQuery<Expense[]>({
    queryKey: ['/api/trips', tripIdNum, 'expenses'],
    queryFn: () => fetch(`/api/trips/${tripIdNum}/expenses`).then(res => res.json()),
    enabled: !!tripIdNum,
  });

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Trip not found</h2>
          <Link href="/trips">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trips
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/trips/${tripId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trip
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trip Budget</h1>
              <p className="text-gray-600">{trip.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-sm text-gray-600">Currency: {userCurrency}</span>
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <AddExpenseForm
              tripId={tripIdNum}
              userId={1} // This should come from auth context
              defaultCurrency={userCurrency}
              onSuccess={() => setShowAddExpense(false)}
              onCancel={() => setShowAddExpense(false)}
            />
          </div>
        )}

        {/* Create Budget Modal */}
        {showCreateBudget && !budget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <CreateBudgetForm
              tripId={tripIdNum}
              userId={1} // This should come from auth context
              defaultCurrency={userCurrency}
              onSuccess={() => setShowCreateBudget(false)}
              onCancel={() => setShowCreateBudget(false)}
            />
          </div>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BudgetDashboard
              tripId={tripIdNum}
              userCurrency={userCurrency}
              onAddExpense={() => setShowAddExpense(true)}
              onViewDetails={() => {/* Switch to expenses tab */}}
            />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpensesList
              expenses={expenses}
              userCurrency={userCurrency}
              onAddExpense={() => setShowAddExpense(true)}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <BudgetAnalytics
              budget={budget || null}
              expenses={expenses}
              userCurrency={userCurrency}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Simple components for the budget features
function CreateBudgetForm({ tripId, userId, defaultCurrency, onSuccess, onCancel }: {
  tripId: number;
  userId: number;
  defaultCurrency: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Trip Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Set up your budget categories and amounts for this trip.
        </p>
        <div className="flex gap-2">
          <Button onClick={onSuccess}>Create Budget</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpensesList({ expenses, userCurrency, onAddExpense }: {
  expenses: Expense[];
  userCurrency: string;
  onAddExpense: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Expenses</CardTitle>
          <Button onClick={onAddExpense}>
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No expenses recorded yet. Start tracking your spending!
          </p>
        ) : (
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{expense.description}</h4>
                  <p className="text-sm text-gray-600 capitalize">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{parseFloat(expense.amount).toFixed(2)} {expense.currency}</p>
                  <p className="text-sm text-gray-600">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BudgetAnalytics({ budget, expenses, userCurrency }: {
  budget: Budget | null;
  expenses: Expense[];
  userCurrency: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Detailed spending analysis and budget insights coming soon!
        </p>
      </CardContent>
    </Card>
  );
}