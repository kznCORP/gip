"use client";

import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthUserContext = createContext({
  user: null,
  loading: false,
  signInWithEmailHandler: async () => {},
  googleLoginHandler: async () => {},
  logout: async () => {},
});

export function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  const signInWithEmailHandler = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("Error trying to sign in with email", e);
    }
  };

  const googleProvider = new GoogleAuthProvider(auth);
  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log("Error trying to sign in with Google", e);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const values = {
    user,
    loading,
    signInWithEmailHandler,
    googleLoginHandler,
    logout,
  };

  return (
    <AuthUserContext.Provider value={values}>
      {children}
    </AuthUserContext.Provider>
  );
}
