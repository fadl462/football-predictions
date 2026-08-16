export const siteConfig = {
  name: 'DZ Football Edge',
  shortName: 'DZ EDGE',
  country: 'Algeria',
  countryCode: 'DZ',
  timezone: 'Africa/Algiers',
  currency: 'DZD',
  locale: 'fr-DZ',
  supportedLocales: ['fr-DZ', 'ar-DZ', 'en'],
  freeDailyDefault: 3,
  vipDailyDefault: 8,
  minConfidenceDefault: 68,
  vipMinConfidenceDefault: 72,
  priorityLeagues: ['Ligue 1', 'Ligue 2', 'Coupe Nationale'],
  paymentProvider: 'Chargily Pay',
};

export const formatDZD = (amount: number) =>
  new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD', maximumFractionDigits: 0 }).format(amount);

export const formatAlgeriaTime = (date: string | Date) =>
  new Intl.DateTimeFormat('fr-DZ', {
    timeZone: siteConfig.timezone,
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(date));
