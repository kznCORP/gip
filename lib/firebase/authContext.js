"use client";

import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthUserContext = createContext({
  user: null,
  loading: false,
  registerEmailHandler: async () => {},
  emailLoginHandler: async () => {},
  googleLoginHandler: async () => {},
  logout: async () => {},
});

export function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  const registerEmailHandler = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("Error trying to create an account.", e);
    }
  };

  const emailLoginHandler = async (email, password) => {
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
    registerEmailHandler,
    emailLoginHandler,
    googleLoginHandler,
    logout,
  };

  return (
    <AuthUserContext.Provider value={values}>
      {children}
    </AuthUserContext.Provider>
  );
}
