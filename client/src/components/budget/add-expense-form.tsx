import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Receipt, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { currencyService, CURRENCIES } from '@/lib/currency';
import { insertExpenseSchema, type InsertExpense } from '@shared/schema';
import { z } from 'zod';

const addExpenseSchema = insertExpenseSchema.extend({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.date(),
});

type AddExpenseFormData = z.infer<typeof addExpenseSchema>;

interface AddExpenseFormProps {
  tripId: number;
  userId: number;
  budgetId?: number;
  defaultCurrency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EXPENSE_CATEGORIES = [
  { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
  { value: 'food', label: 'Food & Dining', icon: '🍽️' },
  { value: 'transport', label: 'Transportation', icon: '🚗' },
  { value: 'activities', label: 'Activities & Tours', icon: '🎯' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { value: 'health', label: 'Health & Medical', icon: '⚕️' },
  { value: 'communication', label: 'Communication', icon: '📱' },
  { value: 'tips', label: 'Tips & Gratuity', icon: '💰' },
  { value: 'other', label: 'Other', icon: '📝' },
];

export function AddExpenseForm({ 
  tripId, 
  userId, 
  budgetId, 
  defaultCurrency = 'USD', 
  onSuccess, 
  onCancel 
}: AddExpenseFormProps) {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AddExpenseFormData>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      tripId,
      userId,
      budgetId: budgetId || undefined,
      amount: 0,
      originalAmount: undefined,
      currency: defaultCurrency,
      originalCurrency: undefined,
      category: '',
      description: '',
      location: '',
      receiptUrl: '',
      date: new Date(),
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: (data: InsertExpense) => 
      fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trips', tripId, 'expenses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/trips', tripId, 'budget'] });
      toast({ title: 'Success', description: 'Expense added successfully!' });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ 
        title: 'Error', 
        description: 'Failed to add expense. Please try again.',
        variant: 'destructive'
      });
    },
  });

  // Convert amount to default currency when currency changes
  const watchCurrency = form.watch('currency');
  const watchAmount = form.watch('amount');

  useEffect(() => {
    const convertAmount = async () => {
      if (watchCurrency === defaultCurrency || !watchAmount) {
        setConvertedAmount(null);
        return;
      }

      try {
        const converted = await currencyService.convertCurrency(
          watchAmount,
          watchCurrency || defaultCurrency,
          defaultCurrency
        );
        setConvertedAmount(converted);
      } catch (error) {
        console.error('Currency conversion failed:', error);
        setConvertedAmount(null);
      }
    };

    convertAmount();
  }, [watchAmount, watchCurrency, defaultCurrency]);

  const onSubmit = (data: AddExpenseFormData) => {
    const expenseData: InsertExpense = {
      ...data,
      originalAmount: data.currency !== defaultCurrency ? data.amount.toString() : undefined,
      originalCurrency: data.currency !== defaultCurrency ? data.currency : undefined,
      amount: (convertedAmount || data.amount).toString(),
      currency: convertedAmount ? defaultCurrency : data.currency,
    };

    addExpenseMutation.mutate(expenseData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-blue-600" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Amount and Currency */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Converted Amount Display */}
            {convertedAmount && (
              <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Converted: {convertedAmount.toFixed(2)} {defaultCurrency}
              </div>
            )}

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you spend on?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Where did this happen?" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={addExpenseMutation.isPending}
                className="flex-1"
              >
                {addExpenseMutation.isPending ? 'Adding...' : 'Add Expense'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={addExpenseMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}