'use client';

import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebase';
import { useAuth } from '../providers/AuthProvider';
import { Role } from '@/types/firebase';

function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <div
      className="mb-4 ml-4 text-xs text-gray-300 inline-block cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default function LogIn() {
  const { uid, userData } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      // 1) 서버 세션 쿠키 삭제 (session 쿠키 지우는 API)
      await fetch('/api/sessionLogout', {
        method: 'POST',
      });

      // 2) Firebase 클라이언트 로그아웃
      await signOut(getAuth(app));
    } finally {
      // 3) 메인으로 이동 + 서버 리렌더
      router.push('/');
      router.refresh();
    }
  }

  return (
    <>
      {!uid && <Button text="로그인" onClick={() => router.push('/login')} />}
      {uid && <Button text="로그아웃" onClick={handleLogout} />}
      {(userData?.role === Role.ADMIN || userData?.role === Role.MANAGER) && (
        <Button text="관리자페이지" onClick={() => router.push('/manage')} />
      )}
    </>
  );
}
