import { getSession } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"

export async function GET (request: NextRequest) {
  await getSession().destroy()
  return NextResponse.redirect(new URL('/', request.url))
}
