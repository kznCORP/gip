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
  deleteSchedule: async () => {},
});

export function ScheduleContextProvider({ children }) {
  const { user } = useContext(AuthUserContext);
  const [schedule, updateSchedule] = useState([]);

  /**
   * Add a Schedule to Firebase
   * Each schedule contains:
   * - title: name for activity
   * - location: latitude and longitude of selected location
   * - dates : from and to dates
   * - notes: text area for additional information
   */
  const addSchedule = async (data) => {
    try {
      const collectionRef = collection(db, "schedules");
      await addDoc(collectionRef, { uid: user.uid, ...data });

      updateSchedule((prevData) => {
        const scheduleExists = prevData.some(
          (item) => item.title === data.title
        );

        if (scheduleExists) {
          return prevData;
        }

        const newSchedule = {
          id: uuidv4(),
          uid: user.uid,
          ...data,
        };

        return [...prevData, newSchedule];
      });
    } catch (e) {
      console.log("Error in adding a Schedule to Context", e.message);
    }
  };

  // Delete a Schedule from Firebase
  const deleteSchedule = async (scheduleId) => {
    try {
      const docRef = doc(db, "schedules", scheduleId);
      await deleteDoc(docRef);

      updateSchedule((prevData) => {
        const updatedItems = prevData.filter((si) => si.id !== scheduleId);
        return [...updatedItems];
      });
    } catch (e) {
      console.log("Error in deleting a Schedule from Context", e);
    }
  };

  // Fetch data from Firebase for every change.
  useEffect(() => {
    const fetchAllSchedules = (updateSchedule, user) => {
      if (user && user.uid) {
        const collectionRef = collection(db, "schedules");
        const scheduleQuery = query(
          collectionRef,
          where("uid", "==", user.uid),
          orderBy("selectedDates")
        );

        try {
          const unsubscribe = onSnapshot(scheduleQuery, async (snapshot) => {
            let allSchedules = [];

            for (const documentSnapshot of snapshot.docs) {
              const items = documentSnapshot.data();
              allSchedules.push({
                id: documentSnapshot.id,
                ...items,
              });
            }

            updateSchedule(allSchedules);
          });
          return () => unsubscribe();
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    fetchAllSchedules(updateSchedule, user);
  }, [user, updateSchedule]);

  const values = {
    schedule,
    addSchedule,
    deleteSchedule,
  };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
}
