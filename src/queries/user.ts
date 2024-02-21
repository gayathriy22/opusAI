import { pool } from '../lib/database'
import { UserInfoResponse } from "@/lib/google-oauth2"

export async function getAndCreateUser (user: UserInfoResponse) {
  const existingUserQuery = 'SELECT uid FROM users WHERE uid = $1';
  const result = await pool.query(existingUserQuery, [user.id]);
  if (result.rowCount) return result.rows[0];

  const newUser = await createUserIfNeeded(user, false)
  return newUser
}

export async function createUserIfNeeded (user: UserInfoResponse, addFirstSeen: boolean) {
  const fields: string[] = ['uid', 'email', 'name', 'picture']
  const date = addFirstSeen ? new Date() : null

  try {
    const query = `INSERT INTO users (${fields})
      VALUES ($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
      RETURNING uid, email, name, picture;`
    const result = await pool.query(query, [user.id, user.email, user.name, user.picture])
    return { result: result.rows[0] }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

export async function updateDatabaseUser (user: UserInfoResponse) {
  try {
    const query = `UPDATE users
      SET email = $2,
          name = $3,
          picture = $4
      WHERE uid = $1;`
    const result = await pool.query(query, [user.id, user.email, user.name, user.picture])
    return { result: result.rowCount === 1 }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}