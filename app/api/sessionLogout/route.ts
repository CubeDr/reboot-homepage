<<<<<<< HEAD
export const dynamic = 'force-dynamic';
import 'server-only';
=======
import 'server-only';

>>>>>>> 2cbd4a8 (1. firebase-admin 추가)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  // session 쿠키를 빈 값 + maxAge 0으로 덮어써서 제거
  cookieStore.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ status: 'logged_out' });
}
