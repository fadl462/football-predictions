import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@dzfootball-edge.local';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPassword) throw new Error('ADMIN_SEED_PASSWORD must be set before running the seed.');

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: UserRole.ADMIN },
    create: { email: adminEmail, name: 'DZ Site Admin', passwordHash, role: UserRole.ADMIN },
  });

  const settings = [
    ['country', 'Algeria'],
    ['country_code', 'DZ'],
    ['timezone', 'Africa/Algiers'],
    ['locale', 'fr-DZ'],
    ['currency', 'DZD'],
    ['priority_leagues', 'UEFA Champions League,Premier League,La Liga,Serie A,Bundesliga,Ligue 1,Europa League,Conference League,Eredivisie,Primeira Liga,Algeria Ligue 1,Algeria Ligue 2,Coupe Nationale'],
    ['free_prediction_count', '3'],
    ['vip_prediction_count', '8'],
    ['min_confidence', '68'],
    ['vip_min_confidence', '72'],
    ['prediction_algorithm_version', 'dz-v2'],
    ['vip_price_dzd', process.env.VIP_PRICE_DZD || '1999'],
  ];

  for (const [key, value] of settings) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  const affiliateUrl = process.env.DEFAULT_AFFILIATE_URL;
  if (affiliateUrl) {
    await prisma.affiliateLink.upsert({
      where: { id: 'default-affiliate' },
      update: { url: affiliateUrl, active: true },
      create: { id: 'default-affiliate', name: 'Primary Betting Partner', url: affiliateUrl, active: true },
    });
  }

  console.log(`Seed complete. Admin: ${adminEmail}`);
}

main()
  .catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
