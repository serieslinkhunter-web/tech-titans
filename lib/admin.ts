import { cookies } from "next/headers";
import { jwtVerify } from "jose";
export const SESSION_COOKIE="tt_session";
const secret=()=>new TextEncoder().encode(process.env.SESSION_SECRET||"");
export async function requireAdmin(){try{const c=await cookies();const t=c.get(SESSION_COOKIE)?.value;if(!t||!process.env.SESSION_SECRET)return null;const {payload}=await jwtVerify(t,secret());return payload.admin===true?t:null}catch{return null}}