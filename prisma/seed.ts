import { PrismaClient, UserRole, PredictionTier, PredictionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main(){
 const passwordHash=await bcrypt.hash('Admin@12345',12);
 await prisma.user.upsert({where:{email:'admin@football-edge.local'},update:{},create:{email:'admin@football-edge.local',name:'Site Admin',passwordHash,role:UserRole.ADMIN}});
 const leagues=[['39','Premier League','England'],['140','La Liga','Spain'],['135','Serie A','Italy'],['61','Ligue 1','France']];
 for(const [id,name,country] of leagues) await prisma.league.upsert({where:{externalId:Number(id)},update:{},create:{externalId:Number(id),name,country}});
 const settings=[['free_prediction_count','3'],['prediction_algorithm_version','v1'],['min_confidence','68']];
 for(const [key,value] of settings) await prisma.setting.upsert({where:{key},update:{value},create:{key,value}});
 await prisma.affiliateLink.upsert({where:{id:'default-affiliate'},update:{url:process.env.DEFAULT_AFFILIATE_URL||'https://example.com'},create:{id:'default-affiliate',name:'Primary Betting Partner',url:process.env.DEFAULT_AFFILIATE_URL||'https://example.com'}});
 console.log('Seed complete. Admin: admin@football-edge.local / Admin@12345');
}
main().finally(()=>prisma.$disconnect());
