import { getSession } from '@/lib/session';
import { addTasks, getTasks } from '@/queries/task';
import { getUser } from '@/queries/user';
import { NextRequest, NextResponse } from 'next/server';
import Joi from 'joi';

export async function GET() {
  const user = await getSession().all().then(s => getUser(s.user));
  const { result: tasks, error } = await getTasks(user.uid);
  if (error) return NextResponse.json({ error: 'Internal server error'}, { status: 500 })
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const user = await getSession().all().then(s => getUser(s.user));
  const body = await req.json();
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    priority: Joi.number().required(),
  });

  // Check the task to make sure it has a name and priority (description is optional)
  // You can use `1` for `today` and `2` for `later`
  const { error } = schema.validate(body);
  if (error) return NextResponse.json({ error: error.details[0].message }, { status: 400 });

  const addedCount = await addTasks(user.uid, [body]);
  return NextResponse.json({ success: addedCount === 1 });
}

