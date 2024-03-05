import { parametrize2D, pool } from '../lib/database';

export interface Task {
  name: string;
  description?: string | null;
  date?: Date | null;
  url?: string | null;
  external_id?: string | null;
}

interface UserTask extends Task {
  task_id: number;
  user_id: string;
}

type GetTasksResult = { result: UserTask[], error?: undefined } | { result?: undefined, error: string };
export async function getTasks (uid: string): Promise<GetTasksResult> {
  const query = `SELECT task_id, user_id, name, description, date, url FROM task
    WHERE user_id = $1`;
  try {
    const result = await pool.query(query, [uid]);
    return { result: result.rows };
  } catch (err: any) {
    console.error(err);
    return { error: err.message };
  }
}

export async function addTasks (uid: string, tasks: Task[], ignoreDuplicates?: boolean): Promise<number | { error: string }> {
  const params = tasks.flatMap(t => {
    const date = t.date ? new Date(t.date) : null;
    return [uid, t.name, t.description ?? null, date, t.url ?? null, t.external_id];
  });
  const query = `INSERT INTO task (user_id, name, description, date, url, external_id)
    VALUES ${parametrize2D(6, tasks.length)}
    ${ignoreDuplicates ? 'ON CONFLICT DO NOTHING' : ''}`;
  try {
    const result = await pool.query(query, params);
    return result.rowCount ?? 0;
  } catch (err: any) {
    console.error(err);
    return { error: err.message };
  }
}
