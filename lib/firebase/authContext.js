"use client";

import { createContext } from "react";
import { auth } from "./firebase";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

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
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const registerEmailHandler = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredential) {
        await updateProfile({ displayName });
      }
    } catch (e) {
      console.log("Error trying to create an account with email.", e);
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
