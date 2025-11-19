'use client';

import AuthLayout from '@/components/authentication/AuthLayout';
import Authentication from '@/components/authentication/Authentication';
import { app, firestore } from '@/firebase';
import { User, getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDialog } from '../providers/DialogProvider';

export default function Login() {
  const router = useRouter();
  const { showDialog } = useDialog();

  const isSignedUp = useCallback(async (uid: string) => {
    const snapshot = await getDoc(doc(firestore, 'users', uid));
    if (!snapshot.exists()) {
      return false;
    }

    const data = snapshot.data();
    return !!data.birthday && !!data.email && !!data.gender && !!data.name && !!data.phone;
  }, []);

  const onUserSignedIn = useCallback(
    async (user: User) => {
      try {
        // ✅ 1) Firebase 클라이언트 로그인은 이미 끝난 상태 (user 인자로 넘어옴)

        // ✅ 2) 이 유저의 ID 토큰 가져오기
        const idToken = await user.getIdToken();

        // ✅ 3) 서버에 세션 로그인 요청 (session 쿠키 생성)
        const res = await fetch('/api/sessionLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        if (!res.ok) {
          throw new Error('sessionLogin failed');
        }

        // ✅ 4) 기존 로직: 가입 여부 확인
        if (await isSignedUp(user.uid)) {
          // 이미 가입된 사용자
          showDialog({
            title: '성공적으로 로그인했습니다',
            onConfirm: () => {
              // 이전 페이지로 돌아가면서, 서버 상태도 새로고침
              router.back();
              router.refresh();
              return true;
            },
          });
        } else {
          // 아직 가입정보가 없는 사용자
          showDialog({
            title: '가입되어 있지 않은 이메일입니다',
            body: '서비스 이용을 위해 간편 회원가입을 하시겠습니까?',
            onCancel: async () => {
              // ❗ 회원가입 안 하고 나가겠다고 하면
              // 1) 서버 세션도 정리
              await fetch('/api/sessionLogout', {
                method: 'POST',
              });

              // 2) 클라이언트 Firebase 로그아웃
              await signOut(getAuth(app));

              // 3) 이전 페이지로 돌아가면서 서버 상태도 새로고침
              router.back();
              router.refresh();
              return true;
            },
            onConfirm: () => {
              // 세션은 유지한 상태로 회원가입 페이지로 이동
              router.push(`/signup?uid=${user.uid}`);
              return true;
            },
          });
        }
      } catch (error) {
        console.error('onUserSignedIn error:', error);
        // 세션 생성에 실패했거나, 중간에 오류가 난 경우
        showDialog({
          title: '로그인에 실패했습니다',
          body: '잠시 후 다시 시도해주세요.',
          onConfirm: () => true,
        });
      }
    },
    [isSignedUp, router, showDialog],
  );

  return (
    <AuthLayout title="로그인">
      <Authentication
        emailVerificationText="이메일로 로그인"
        googleVerificationText="구글 계정으로 로그인"
        onUserSignedIn={onUserSignedIn}
      />
      <p className="text-sm font-light text-gray-500">
        계정이 없으신가요?
        <Link
          href="/signup"
          className="ml-4 font-medium text-gray-600 hoverable:hover:underline active:underline"
          replace={true}
        >
          회원가입하기
        </Link>
      </p>
    </AuthLayout>
  );
}
