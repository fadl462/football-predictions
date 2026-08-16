import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main(){
 const passwordHash=await bcrypt.hash('Admin@12345',12);
 await prisma.user.upsert({where:{email:'admin@dzfootball-edge.local'},update:{},create:{email:'admin@dzfootball-edge.local',name:'DZ Site Admin',passwordHash,role:UserRole.ADMIN}});
 const settings=[
  ['country','Algeria'],['country_code','DZ'],['timezone','Africa/Algiers'],['locale','fr-DZ'],['currency','DZD'],
  ['priority_leagues','Ligue 1,Ligue 2,Coupe Nationale'],['free_prediction_count','3'],['vip_prediction_count','8'],
  ['min_confidence','68'],['vip_min_confidence','72'],['prediction_algorithm_version','dz-v2'],['vip_price_dzd',process.env.VIP_PRICE_DZD||'1999']
 ];
 for(const [key,value] of settings) await prisma.setting.upsert({where:{key},update:{value},create:{key,value}});
 await prisma.affiliateLink.upsert({where:{id:'default-affiliate'},update:{url:process.env.DEFAULT_AFFILIATE_URL||'https://example.com'},create:{id:'default-affiliate',name:'Primary Betting Partner',url:process.env.DEFAULT_AFFILIATE_URL||'https://example.com'}});
 console.log('Seed complete. Admin: admin@dzfootball-edge.local / Admin@12345');
}
main().finally(()=>prisma.$disconnect());
