import { getTokens, getUserInfo } from '@/lib/google-oauth2';
import { getSession } from '@/lib/session';
import { getAndCreateUser } from '@/queries/user';
import { NextRequest, NextResponse } from "next/server";

// User logs in with Google
// The user will be identified by their email
// When they log in, we store their email and tokens, encrypted, in a cookie
// To check it, we look for user with that email and try to authenticate

// type OAuthParameterType = {
//   code: string,
//   scope: string,
//   prompt: string
// }

export async function GET(request: NextRequest) {
  await getSession().destroy();
  const oauthCode = request.nextUrl.searchParams.get('code');
  if (!oauthCode) return Response.json({ error: 'OAuth grant code missing' }, { status: 400 })
  
  const tokens = await getTokens(oauthCode);
  if (tokens.error) return Response.json({ error: 'Invalid credentials, please try again' }, { status: tokens.error.code });

  const userInfo = await getUserInfo(tokens.access_token);
  const user = await getAndCreateUser(userInfo);

  await getSession().set('user', userInfo)

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
