"use client";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthUserContext = createContext({
  authUser: null,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);

  const authStateChanged = async (user) => {
    if (!user) {
      setAuthUser(null);
      return;
    }

    setAuthUser({
      uid: user.uid,
      email: user.email,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  });

  return {
    authUser,
  };
}

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
