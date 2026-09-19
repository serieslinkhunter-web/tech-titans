import { cookies } from 'next/headers'
import { supabase } from './supabase'
export const SESSION_COOKIE='tt_session'
export async function getSession(){const c=await cookies();return c.get(SESSION_COOKIE)?.value||''}
export async function requireAdmin(){const token=await getSession();if(!token)return null;const {data,error}=await supabase.rpc('admin_session_valid',{p_token:token});return !error&&data===true?token:null}