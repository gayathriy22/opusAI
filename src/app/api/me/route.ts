import { getSession } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession().all();
  return NextResponse.json(session?.user);
}
