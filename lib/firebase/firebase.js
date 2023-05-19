// Import functions from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyAYGv-2m2jT5yYXsrDzF-aRqrYqkJILxrU",
  authDomain: "whatarewedoing-7e3f5.firebaseapp.com",
  projectId: "whatarewedoing-7e3f5",
  storageBucket: "whatarewedoing-7e3f5.appspot.com",
  messagingSenderId: "280267572848",
  appId: "1:280267572848:web:57e7ea57b8b03b311056b5",
  measurementId: "G-ZG18S07BC0",
};

// Initilize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
