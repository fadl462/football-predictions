export const competitionBoard = {
  topLeagues: [
    { name: 'Premier League', country: 'England', region: 'Europe', priority: 135 },
    { name: 'La Liga', country: 'Spain', region: 'Europe', priority: 134 },
    { name: 'Serie A', country: 'Italy', region: 'Europe', priority: 133 },
    { name: 'Bundesliga', country: 'Germany', region: 'Europe', priority: 132 },
    { name: 'Ligue 1', country: 'France', region: 'Europe', priority: 131 },
    { name: 'Eredivisie', country: 'Netherlands', region: 'Europe', priority: 124 },
    { name: 'Primeira Liga', country: 'Portugal', region: 'Europe', priority: 123 },
    { name: 'Championship', country: 'England', region: 'Europe', priority: 118 },
  ],
  uefa: [
    { name: 'UEFA Champions League', region: 'UEFA', priority: 140 },
    { name: 'UEFA Europa League', region: 'UEFA', priority: 129 },
    { name: 'UEFA Conference League', region: 'UEFA', priority: 128 },
  ],
  americas: [
    { name: 'Copa Libertadores', region: 'Americas', priority: 98 },
    { name: 'Brasileirao', country: 'Brazil', region: 'Americas', priority: 97 },
    { name: 'Argentina Primera', country: 'Argentina', region: 'Americas', priority: 96 },
    { name: 'Liga MX', country: 'Mexico', region: 'Americas', priority: 95 },
    { name: 'MLS', country: 'USA / Canada', region: 'Americas', priority: 94 },
  ],
  asia: [
    { name: 'Saudi Pro League', country: 'Saudi Arabia', region: 'Asia', priority: 93 },
    { name: 'J1 League', country: 'Japan', region: 'Asia', priority: 92 },
    { name: 'K League 1', country: 'South Korea', region: 'Asia', priority: 91 },
    { name: 'Qatar Stars League', country: 'Qatar', region: 'Asia', priority: 90 },
    { name: 'AFC Champions League Elite', region: 'AFC', priority: 89 },
  ],
  africa: [
    { name: 'CAF Champions League', region: 'Africa', priority: 88 },
    { name: 'CAF Confederation Cup', region: 'Africa', priority: 87 },
    { name: 'Egypt Premier League', country: 'Egypt', region: 'Africa', priority: 86 },
    { name: 'Botola Pro', country: 'Morocco', region: 'Africa', priority: 85 },
    { name: 'Ligue 1 Mobilis', country: 'Algeria', region: 'Africa', priority: 84 },
    { name: 'Ligue 2', country: 'Algeria', region: 'Africa', priority: 82 },
  ],
} as const;

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
  paymentProvider: 'Chargily Pay',
  competitionBoard,
};

export const formatUSD = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
export const formatAlgeriaTime = (date: string | Date) => new Intl.DateTimeFormat('en-GB', { timeZone: siteConfig.timezone, day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(date));
