import { getTokens, getUserInfo } from '@/lib/google-oauth2';
import { getSession } from '@/lib/session';
import { NextRequest } from "next/server";

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
  // await getSession().destroy();
  const oauthCode = request.nextUrl.searchParams.get('code');
  if (!oauthCode) return Response.json({ error: 'OAuth grant code missing' }, { status: 400 })
  
  const tokens = await getTokens(oauthCode);
  const userInfo = await getUserInfo(tokens.access_token);
  return Response.json({ userInfo, tokens });

  // await Promise.all([
  //   getSession().set('user',),
  // ])
  // if (session.user) return Response.json(session);

  // session.user = "TEST_" + Math.random()
  // await getSession().set('user', session.user);

  // return Response.json(session);
}
// localhost:3000/api/oauth2
