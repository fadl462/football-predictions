import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-only-change-me');
export async function hashPassword(p:string){return bcrypt.hash(p,12)}
export async function verifyPassword(p:string,h:string){return bcrypt.compare(p,h)}
export async function createSession(userId:string){
 const token=await new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret);
 (await cookies()).set('session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7});
}
export async function getSessionUser(){
 const token=(await cookies()).get('session')?.value; if(!token)return null;
 try{const {payload}=await jwtVerify(token,secret); if(!payload.sub)return null; return prisma.user.findUnique({where:{id:payload.sub},include:{subscription:true}})}catch{return null}
}
export async function requireAdmin(){const u=await getSessionUser(); if(!u||u.role!=='ADMIN') return null; return u}
export async function logout(){(await cookies()).delete('session')}
export function hasVip(u:any){return !!u && (u.role==='ADMIN'||(u.subscription?.status==='ACTIVE' && (!u.subscription.endsAt||u.subscription.endsAt>new Date())))}
