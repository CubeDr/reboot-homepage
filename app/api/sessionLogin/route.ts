<<<<<<< HEAD
export const dynamic = 'force-dynamic';
import 'server-only';
=======
import 'server-only';

>>>>>>> 2cbd4a8 (1. firebase-admin 추가)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/firebaseAdmin';

export async function POST(req: Request) {
  try {
    // 1) 클라이언트에서 보낸 JSON(body) 파싱
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'idToken is required' },
        { status: 400 },
      );
    }

    // 2) idToken이 진짜 Firebase에서 발급한 유효한 토큰인지 검증
    const decoded = await adminAuth.verifyIdToken(idToken);

    // 3) 세션 쿠키 유효 기간 설정 (예: 5일)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

    // 4) 세션 쿠키 생성
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // 5) HttpOnly 쿠키로 저장
    const cookieStore = cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn / 1000, // 초 단위
    });

    // 6) 응답 (원하면 uid 같은 정보도 내려줄 수 있음)
    return NextResponse.json({
      status: 'ok',
      uid: decoded.uid,
    });
  } catch (err) {
    console.error('sessionLogin error', err);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
