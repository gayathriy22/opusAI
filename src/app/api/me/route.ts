import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession().all();
  return NextResponse.json(session?.user ?? null);
}
