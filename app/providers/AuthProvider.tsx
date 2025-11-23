'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { UserData } from '@/types/firebase';

interface AuthContextType {
  uid: string | null;
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a ClientAuthProvider');
  }
  return context;
}

type AuthProviderProps = {
  children: ReactNode;
  initialUid: string | null;
  initialUserData: UserData | null;
};

export function AuthProvider({
  children,
  initialUid,
  initialUserData,
}: AuthProviderProps) {

  return (
    <AuthContext.Provider
      value={{ uid: initialUid, userData: initialUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
