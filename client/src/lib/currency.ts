// Currency conversion utilities and API integration

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

// Common currencies with their symbols
export const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
];

class CurrencyService {
  private cache: Map<string, ExchangeRate> = new Map();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  // Get cached exchange rate if available and not expired
  private getCachedRate(from: string, to: string): ExchangeRate | null {
    const key = `${from}-${to}`;
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.lastUpdated.getTime() < this.CACHE_DURATION) {
      return cached;
    }
    
    return null;
  }

  // Cache exchange rate
  private setCachedRate(rate: ExchangeRate): void {
    const key = `${rate.from}-${rate.to}`;
    this.cache.set(key, rate);
  }

  // Fetch exchange rate from free API (exchangerate-api.io)
  async getExchangeRate(from: string, to: string): Promise<number> {
    if (from === to) return 1;

    // Check cache first
    const cached = this.getCachedRate(from, to);
    if (cached) {
      return cached.rate;
    }

    try {
      // Using a free exchange rate API
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }

      const data = await response.json();
      const rate = data.rates[to];

      if (!rate) {
        throw new Error(`Exchange rate not found for ${from} to ${to}`);
      }

      // Cache the rate
      const exchangeRate: ExchangeRate = {
        from,
        to,
        rate,
        lastUpdated: new Date(),
      };
      this.setCachedRate(exchangeRate);

      return rate;
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      // Fallback to approximate rates for common currencies
      return this.getFallbackRate(from, to);
    }
  }

  // Fallback exchange rates (approximate, for offline use)
  private getFallbackRate(from: string, to: string): number {
    const fallbackRates: Record<string, Record<string, number>> = {
      USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35 },
      EUR: { USD: 1.18, GBP: 0.86, JPY: 130, CAD: 1.47, AUD: 1.59 },
      GBP: { USD: 1.37, EUR: 1.16, JPY: 151, CAD: 1.71, AUD: 1.85 },
    };

    if (fallbackRates[from]?.[to]) {
      return fallbackRates[from][to];
    }

    // If no fallback rate found, return 1 (no conversion)
    console.warn(`No fallback rate available for ${from} to ${to}`);
    return 1;
  }

  // Convert amount between currencies
  async convertCurrency(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getExchangeRate(from, to);
    return amount * rate;
  }

  // Get multiple exchange rates at once
  async getMultipleRates(from: string, toCurrencies: string[]): Promise<Record<string, number>> {
    const rates: Record<string, number> = {};
    
    await Promise.all(
      toCurrencies.map(async (to) => {
        try {
          rates[to] = await this.getExchangeRate(from, to);
        } catch (error) {
          console.error(`Failed to get rate for ${from} to ${to}:`, error);
          rates[to] = 1; // Fallback
        }
      })
    );

    return rates;
  }

  // Format currency amount with proper symbol and locale
  formatCurrency(amount: number, currencyCode: string, locale: string = 'en-US'): string {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (error) {
      // Fallback formatting
      const currency = CURRENCIES.find(c => c.code === currencyCode);
      const symbol = currency?.symbol || currencyCode;
      return `${symbol}${amount.toFixed(2)}`;
    }
  }

  // Get currency info by code
  getCurrencyInfo(code: string): CurrencyInfo | undefined {
    return CURRENCIES.find(c => c.code === code);
  }

  // Get popular currencies for a destination
  getDestinationCurrencies(country: string): string[] {
    const countryCurrencyMap: Record<string, string[]> = {
      'USA': ['USD'],
      'United States': ['USD'],
      'France': ['EUR'],
      'Germany': ['EUR'],
      'Italy': ['EUR'],
      'Spain': ['EUR'],
      'Greece': ['EUR'],
      'United Kingdom': ['GBP'],
      'UK': ['GBP'],
      'England': ['GBP'],
      'Japan': ['JPY'],
      'Canada': ['CAD'],
      'Australia': ['AUD'],
      'Switzerland': ['CHF'],
      'China': ['CNY'],
      'India': ['INR'],
      'Singapore': ['SGD'],
      'Thailand': ['THB'],
      'Indonesia': ['IDR'],
      'Malaysia': ['MYR'],
      'Philippines': ['PHP'],
      'Vietnam': ['VND'],
      'South Korea': ['KRW'],
      'Brazil': ['BRL'],
      'Mexico': ['MXN'],
      'Russia': ['RUB'],
      'Turkey': ['TRY'],
      'South Africa': ['ZAR'],
    };

    return countryCurrencyMap[country] || ['USD']; // Default to USD
  }
}

export const currencyService = new CurrencyService();