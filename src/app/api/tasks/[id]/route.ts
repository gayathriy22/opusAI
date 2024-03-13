import { checkUser } from '@/lib/session';
import { addTasks, updateTask } from '@/queries/task';
import { NextRequest, NextResponse } from 'next/server';
import Joi from 'joi';

/**
 * Overrides a task's name, description, date, and complete state.
 * @param req The request object
 * @returns A response indicating whether the update was successful
 */
export async function PUT(req: NextRequest, { params }: any) {
  const { user, errRes } = await checkUser();
  if (errRes) return errRes;

  const body = await req.json();
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    date: Joi.string().isoDate(),
    complete: Joi.boolean().required()
  });

  // Check the task to make sure it has a name
  const { error } = schema.validate(body);
  if (error) return NextResponse.json({ error: error.details[0].message }, { status: 400 });

  body.task_id = params.id
  const updates = await updateTask(body, user.uid);
  return NextResponse.json({ success: updates === 1 });
}

