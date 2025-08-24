import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, RefreshCw, TrendingUp } from 'lucide-react';
import { currencyService, CURRENCIES } from '@/lib/currency';
import type { CurrencyInfo } from '@/lib/currency';

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('100');
  const [toAmount, setToAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Convert currency when inputs change
  useEffect(() => {
    const convertCurrency = async () => {
      if (!fromAmount || fromAmount === '0' || fromCurrency === toCurrency) {
        setToAmount(fromAmount);
        setExchangeRate(1);
        return;
      }

      setIsLoading(true);
      try {
        const rate = await currencyService.getExchangeRate(fromCurrency, toCurrency);
        const converted = parseFloat(fromAmount) * rate;
        
        setExchangeRate(rate);
        setToAmount(converted.toFixed(2));
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Currency conversion failed:', error);
        setToAmount('Error');
      } finally {
        setIsLoading(false);
      }
    };

    convertCurrency();
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };

  const handleRefresh = () => {
    // Force refresh by updating the dependencies
    setLastUpdated(null);
    const currentFromAmount = fromAmount;
    setFromAmount('');
    setTimeout(() => setFromAmount(currentFromAmount), 100);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency: CurrencyInfo) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapCurrencies}
            className="p-2"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={isLoading ? 'Converting...' : toAmount}
              readOnly
              placeholder="Converted amount"
              className="flex-1"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency: CurrencyInfo) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Exchange Rate Info */}
        {exchangeRate && (
          <div className="text-sm text-gray-600 space-y-1">
            <p>1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</p>
            {lastUpdated && (
              <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
            )}
          </div>
        )}

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="w-full"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Rate
        </Button>
      </CardContent>
    </Card>
  );
}

export default CurrencyConverter;