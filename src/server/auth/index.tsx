'use client';

import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from 'react';
import { use } from 'react';
import type { User } from '../db/schema';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};


const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  // eslint-disable-next-line prefer-const
  let context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<User | null>;
}) {
  // eslint-disable-next-line prefer-const
  let initialUser = use(userPromise);
  // eslint-disable-next-line prefer-const
  let [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
