import { getSession } from '@/lib/session';
import { getUser } from '@/queries/user';
import { NextRequest, NextResponse } from 'next/server';

interface CanvasTask {
  id: number;
  title: string;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  due_at: string; // ISO Date string
  points_possible: number;
  url: string;
}

const CANVAS_BASE_URL = 'https://canvas.eee.uci.edu';

async function getPlannerTasks (token: string) {
  const PLANNER_URL = CANVAS_BASE_URL + '/api/v1/planner/items?start_date=' + new Date().toISOString();
  const headers = { Authorization: 'Bearer ' + token };
  const tasks: any[] = await fetch(PLANNER_URL, { headers }).then(x => x.json());

  const canvasTasks = tasks.filter(t => t.submissions?.submitted === false)
    .map(t => ({ ...t.plannable, course_id: t.course_id, url: CANVAS_BASE_URL + t.html_url })) as CanvasTask[];
  canvasTasks.sort((a, b) => {
    // Sort by the due date first, then if two things are due at the same time, by most points first
    return new Date(a.due_at).getTime() - new Date(b.due_at).getTime() || b.points_possible - a.points_possible
  });

  return canvasTasks
}

export async function GET(req: NextRequest) {
  const user = await getSession().all().then(s => getUser(s.user));
  const token = user.canvas_token;
  if (!token) return NextResponse.json({ error: 'No `canvas_token` for this user' }, { status: 400 });

  const tasks = await getPlannerTasks(token);
  return NextResponse.json(tasks);
}
