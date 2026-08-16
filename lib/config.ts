export const siteConfig = {
  name: 'The Match Desk',
  shortName: 'MATCH DESK',
  country: 'Algeria',
  countryCode: 'DZ',
  timezone: 'Africa/Algiers',
  currency: 'USD',
  locale: 'en-US',
  supportedLocales: ['en-US', 'fr-DZ', 'ar-DZ'],
  freeDailyDefault: 3,
  vipDailyDefault: 8,
  minConfidenceDefault: 68,
  vipMinConfidenceDefault: 72,
  vipPriceDefault: 9.99,
  priorityLeagues: ['UEFA Champions League','Premier League','La Liga','Serie A','Bundesliga','Ligue 1','Europa League','Conference League','Eredivisie','Primeira Liga','Algeria Ligue 1','Algeria Ligue 2','Coupe Nationale'],
  paymentProvider: 'Chargily Pay',
};

export const formatUSD = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
export const formatAlgeriaTime = (date: string | Date) => new Intl.DateTimeFormat('en-GB', { timeZone: siteConfig.timezone, day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(date));
