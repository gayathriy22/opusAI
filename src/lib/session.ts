import nextAppSession, { promisifyStore } from 'next-app-session';
import { expressSession } from "next-session/lib/compat";
import { pool } from './database';
import { NextResponse } from 'next/server';
import { getUser } from '@/queries/user';

const pgSession = require("connect-pg-simple")(expressSession);
const connectStore = new pgSession({ pool, tableName: 'session' });

export const getSession = nextAppSession<any>({
  name: 'session_id', // The cookie name that will hold sid
  secret: process.env.APP_SECRET,
  store: promisifyStore(connectStore)
});

export async function checkUser () {
  const user = await getSession().all().then(s => s.user && getUser(s.user));
  if (!user) return { errRes: NextResponse.json({ error: 'Unauthenticed' }, { status: 401 }) };
  return { user }
}
