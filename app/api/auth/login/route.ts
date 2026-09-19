import {NextResponse} from 'next/server';import {cookies} from 'next/headers';import {supabase} from '@/lib/supabase';import {SESSION_COOKIE} from '@/lib/admin'
export async function POST(req:Request){
 const b=await req.json().catch(()=>({}));
 const username=String(b.username||''); const password=String(b.password||'');
 const {data,error}=await supabase.rpc('admin_issue_session',{p_username:username,p_password:password});
 if(error){console.error('LOGIN_RPC_ERROR',JSON.stringify({message:error.message,code:error.code,hint:error.hint}));return NextResponse.json({error:'Login service error.'},{status:500})}
 if(!data){console.error('LOGIN_REJECTED',JSON.stringify({username,hasPassword:!!password}));return NextResponse.json({error:'Invalid login.'},{status:401})}
 const c=await cookies();c.set(SESSION_COOKIE,String(data),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:43200});return NextResponse.json({ok:true})
}