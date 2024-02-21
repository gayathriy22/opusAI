import { getSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { UserInfoResponse } from './lib/google-oauth2';

export async function middleware(request: NextRequest) {  
  const user: UserInfoResponse = await fetch(`${process.env.APP_BASE_URL}/api/me`, {
    // Forward cookie to Route Handler
    headers: { cookie: request.headers.get('cookie') as string }
  }).then(x => x.json()).catch(() => {});

  console.log(user)
 
  if (user) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: ['/(dashboard.*)'],
  experimental: { runtime: 'nodejs' }
}
