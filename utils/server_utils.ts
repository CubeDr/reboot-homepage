import 'server-only';

import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/firebaseAdmin';
import { toRoleFromString, UserData } from '@/types/firebase';

export type ServerUser = {
  uid: string;
  email?: string;
};

export async function getServerUser(): Promise<ServerUser | null> {
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    return null;
  }

  try {
    // true: 만료된/취소된 세션이면 에러를 던지도록
    const decoded = await adminAuth.verifySessionCookie(session, true);

    return {
      uid: decoded.uid,
      email: decoded.email,
    };
  } catch (err) {
    console.error('verifySessionCookie error', err);
    return null;
  }
}

export type ServerAuth = {
  uid: string | null;
  userData: UserData | null;
};

export async function getServerAuth(): Promise<ServerAuth> {
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    // 로그인 안 된 상태
    return { uid: null, userData: null };
  }

  try {
    // 세션 쿠키 검증 (만료되었거나 취소된 세션이면 에러)
    const decoded = await adminAuth.verifySessionCookie(session, true);
    const uid = decoded.uid;

    // users/{uid} 문서 가져오기
    const snap = await adminDb.collection('users').doc(uid).get();

    if (!snap.exists) {
      // 로그인은 되어 있지만 users 문서가 없는 상태
      return { uid, userData: null };
    }

    const raw = snap.data() as any;

    const userData: UserData = {
      uid,
      name: raw.name ?? '',
      role: toRoleFromString(raw.role),
      gender: raw.gender ?? '',
      birthday: raw.birthday ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
    };

    return { uid, userData };
  } catch (err) {
    console.error('getServerAuth error', err);
    return { uid: null, userData: null };
  }
}
