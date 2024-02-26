import { Pool } from 'pg';

export function parametrize (count: number, offset: number = 0): string {
  return new Array(count).fill('$').map((x, i) => x + (i + 1 + offset)).join(', ')
}

export function parametrize2D (columns: number, rows: number): string {
  return new Array(rows).fill('').map((r, i) => `(${parametrize(columns, i * columns)})`).join(', ')
}

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.DATABASE_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
})
