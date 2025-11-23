'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useAuth } from '../app/providers/AuthProvider';
import { useDialog } from '../app/providers/DialogProvider';
import { Role } from '@/types/firebase';

interface Props {
  requiresSignOut?: boolean;
  allowedRoles?: Role[];
  onlyCheckEntry?: boolean;
  unauthorizedText?: string;
  onUnauthorized?: () => void;
}

export default function Authorized({
  requiresSignOut,
  allowedRoles,
  onlyCheckEntry,
  unauthorizedText,
  onUnauthorized,
  children,
}: PropsWithChildren<Props>) {
  const { userData } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { showDialog } = useDialog();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isEntry, setIsEntry] = useState(true);

  useEffect(() => {
    if (isAuthorized == null) {
      return;
    }

    if (isAuthorized || (!isEntry && onlyCheckEntry)) {
      setIsEntry(false);
      return;
    }
    setIsEntry(false);

    if (onUnauthorized == null) {
      showDialog({
        title: unauthorizedText ?? '접근 권한이 없습니다',
        onConfirm: () => {
          router.back();
          return true;
        },
      });
      return;
    }
    onUnauthorized();
  }, [router, onUnauthorized, pathname, isAuthorized, isEntry, onlyCheckEntry]);

  useEffect(() => {

    if (userData != null && requiresSignOut) {
      setIsAuthorized(false);
      return;
    }

    if (allowedRoles != null) {
      const role = userData?.role;
      if (role == null) {
        setIsAuthorized(false);
        return;
      }

      if (allowedRoles.indexOf(role) === -1) {
        setIsAuthorized(false);
        return;
      }
    }
    setIsAuthorized(true);
  }, [userData, setIsAuthorized, allowedRoles, requiresSignOut]);

  return <>{isAuthorized && children}</>;
}
