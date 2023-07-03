"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./authContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const ScheduleContext = createContext({
  schedules: [],
  addSchedule: async () => {},
  deleteSchedule: async () => {},
  addDate: async () => {},
  deleteDate: async () => {},
});

export function ScheduleContextProvider({ children }) {
  const { user } = useContext(AuthUserContext);
  const [schedules, updateSchedule] = useState([]);

  /**
   * Adds a Date to Firebase
   * Each Date contains:
   * - activities: array of events
   * - dates : from and to dates
   */
  const addDate = async (data) => {
    try {
      const collectionRef = collection(db, "schedules");
      await addDoc(collectionRef, {
        uid: user.uid,
        ...data,
        activities: [],
      });

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
          activities: [],
          ...data,
        };

        return [...prevData, newSchedule];
      });
    } catch (e) {
      console.log("Error in adding a Schedule to Context", e.message);
    }
  };

  // Delete a Date from Firebase
  const deleteDate = async (scheduleId) => {
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

  /**
   * Adds a Schedule to Firebase
   * Each schedule is a child of a Date and contains:
   * - title: name of an event
   * - selectedLocation: address of the event
   * - notes: text area
   */
  const addSchedule = async (selectedDates, newActivity) => {
    try {
      const querySnapshot = await getDocs(collection(db, "schedules"));
      const matchingDates = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        const fromDate =
          data.selectedDates.from instanceof Date
            ? data.selectedDates.from
            : data.selectedDates.from.toDate();

        if (!fromDate || fromDate === "" || fromDate === null) {
          throw new Error("fromDate cannot be null, empty, or a '' string");
        }

        return fromDate.getTime() === selectedDates.from.getTime();
      });

      if (matchingDates) {
        const docRef = doc(db, "schedules", matchingDates.id);
        await updateDoc(docRef, {
          activities: [...matchingDates.data().activities, newActivity],
        });
      } else {
        // Create a new Schedule
        await addDoc(collection(db, "schedules"), {
          uid: user.uid,
          selectedDates: selectedDates,
          activities: [newActivity],
        });
      }
    } catch (e) {
      console.log("Error in Adding Activity: ", e);
    }
  };

  // Fetch data from Firebase for every change.
  useEffect(() => {
    const fetchAllSchedules = async (updateSchedule, user) => {
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
    schedules,
    addSchedule,
    addDate,
    deleteDate,
  };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
}
