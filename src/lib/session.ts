import nextAppSession, { promisifyStore } from 'next-app-session';
import { expressSession } from "next-session/lib/compat";
import { pool } from './database';

const pgSession = require("connect-pg-simple")(expressSession);
const connectStore = new pgSession({ pool, tableName: 'session' });

export const getSession = nextAppSession<any>({
  name: 'session_id', // The cookie name that will hold sid
  secret: process.env.APP_SECRET,
  store: promisifyStore(connectStore)
});
