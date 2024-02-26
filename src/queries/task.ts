import { parametrize2D, pool } from '../lib/database';

export interface Task {
  name: string;
  description?: string | null;
  priority: number;
}

interface UserTask extends Task {
  task_id: number;
  user_id: string;
}

type GetTasksResult = { result: UserTask[], error?: undefined } | { result?: undefined, error: string };
export async function getTasks (uid: string): Promise<GetTasksResult> {
  const query = `SELECT task_id, user_id, name, description, priority FROM task
    WHERE user_id = $1`;
  try {
    const result = await pool.query(query, [uid]);
    return { result: result.rows };
  } catch (err: any) {
    console.error(err);
    return { error: err.message };
  }
}

export async function addTasks (uid: string, tasks: Task[]): Promise<number | { error: string }> {
  const params = tasks.flatMap(t => { t.description ??= null; return [uid, t.name, t.description, t.priority]; });
  const query = `INSERT INTO task (user_id, name, description, priority)
    VALUES ${parametrize2D(4, tasks.length)}`;
  try {
    const result = await pool.query(query, params);
    return result.rowCount ?? 0;
  } catch (err: any) {
    console.error(err);
    return { error: err.message };
  }
}
