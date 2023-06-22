"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./authContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const ScheduleContext = createContext({
  schedule: [],
  addSchedule: async () => {},
});

export function ScheduleContextProvider({ children }) {
  const { user } = useContext(AuthUserContext);
  const [schedule, updateSchedule] = useState([]);

  const addSchedule = async (data) => {
    /**
     * Process Schedule Logic here
     *
     * (page.js)
     * [x] Read Title input
     * [x] Read Location input
     * [ ] Read Dates input
     *
     * (scheduleContext.js)
     * [x] Bundle Data together into one Object
     * [ ] Write to Firebase
     */
    try {
      //   const collectionRef = collection(db, "packing-items");
      //   await addDoc(collectionRef, { uid: user.uid, ...data });

      updateSchedule((prevData) => {
        const newSchedule = {
          id: uuidv4(),
          uid: user.uid,
          ...data,
        };
        return [...prevData, newSchedule];
      });
    } catch (e) {
      console.log("Error in adding a Schedule to Context", e);
    }
  };

  const values = {
    schedule,
    addSchedule,
  };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
}
