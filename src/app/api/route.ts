import nextAppSession, { promisifyStore } from 'next-app-session';
import { expressSession } from "next-session/lib/compat";
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.DATABASE_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
})

const pgSession = require("connect-pg-simple")(expressSession);
const connectStore = new pgSession({ pool, tableName: 'session' });

export const getSession = nextAppSession<any>({
  name: 'session_id', // The cookie name that will hold sid
  secret: process.env.APP_SECRET,
  store: promisifyStore(connectStore)
});


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