import { createClient } from "@supabase/supabase-js";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase=createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false}});
export function getAdminSupabase(){const token=process.env.ADMIN_DB_TOKEN;if(!url||!key||!token)throw new Error("Admin database configuration is missing.");return createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false},global:{headers:{"x-tech-titans-admin":token,"x-client-info":"tech-titans-admin"}}});}