import { getSession } from '@/lib/session';

// User logs in with Google
// The user will be identified by their email
// When they log in, we store their email and tokens, encrypted, in a cookie
// To check it, we look for user with that email and try to authenticate

export async function GET() {
  const session = await getSession().all();
  if (session.user) return Response.json(session);

  session.user = "TEST_" + Math.random()
  await getSession().set('user', session.user);

  return Response.json(session);
}