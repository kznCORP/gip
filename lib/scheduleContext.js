"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./authContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { filterDateFormatter } from "./utils";

export const ScheduleContext = createContext({
  schedules: [],
  addSchedule: async () => {},
  deleteSchedule: async () => {},
  addDate: async () => {},
  deleteDate: async () => {},

  filteredDates: [],
  filteredSchedules: [],
  isFilterApplied: false,
  selectedDate: null,
  applyFilter: () => {},
});

export function ScheduleContextProvider({ children }) {
  const { user } = useContext(AuthUserContext);
  const [schedules, updateSchedule] = useState([]);

  const [filteredDates, setFilteredDates] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const applyFilter = async (data) => {
    const filteredSchedule = schedules.filter((schedule) => {
      const formattedDate = filterDateFormatter(schedule);
      return (
        formattedDate.month === data.month && formattedDate.day === data.day
      );
    });

    setSelectedDate(data);
    setFilteredSchedules(filteredSchedule);
    setIsFilterApplied(true);
  };

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

  /**
   * Adds a Schedule to Firebase
   * Each schedule is a child of a Date and contains:
   * - title: name of an event
   * - selectedLocation: address of the event
   * - notes: text area
   */
  const addSchedule = async (selectedDates, newActivity, userId) => {
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

        return (
          data.uid === userId &&
          fromDate.getTime() === selectedDates.from.getTime()
        );
      });

      if (matchingDates) {
        const docRef = doc(db, "schedules", matchingDates.id);
        const updatedActivities = [
          ...matchingDates.data().activities,
          newActivity,
        ];

        await updateDoc(docRef, {
          activities: updatedActivities,
        });

        updateSchedule((prevData) => {
          const updatedSchedules = prevData.map((schedule) => {
            if (schedule.id === matchingDates.id) {
              return { ...schedule, activities: updatedActivities };
            }
            return schedule;
          });
          return updatedSchedules;
        });
      } else {
        // Create a new Schedule
        await addDoc(collection(db, "schedules"), {
          uid: userId,
          selectedDates: selectedDates,
          activities: [newActivity],
        });
      }
    } catch (e) {
      console.log("Error in Adding Activity: ", e);
    }
  };

  // Delete a Schedule from Firebase
  const deleteSchedule = async (scheduleId, activityId) => {
    try {
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.id === scheduleId) {
          const updatedActivities = schedule.activities.filter(
            (activity) => activity.id !== activityId
          );
          return { ...schedule, activities: updatedActivities };
        }
        return schedule;
      });

      updateSchedule(updatedSchedules);

      const docRef = doc(db, "schedules", scheduleId);
      await updateDoc(docRef, {
        activities: updatedSchedules.find(
          (schedule) => schedule.id === scheduleId
        ).activities,
      });

      const scheduleToDelete = updatedSchedules.find(
        (schedule) => schedule.id === scheduleId
      );
      if (scheduleToDelete && scheduleToDelete.activities.length === 0) {
        await deleteDoc(docRef);
        updateSchedule(
          updatedSchedules.filter((schedule) => schedule.id !== scheduleId)
        );
      }
    } catch (e) {
      console.log("Error in deleting a Schedule from Context", e);
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
            setFilteredSchedules(allSchedules);
          });
          return () => unsubscribe();
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    fetchAllSchedules(updateSchedule, user);
  }, [user, updateSchedule]);

  useEffect(() => {
    const populateFilterDates = () => {
      if (schedules) {
        const uniqueDates = new Set();
        const addedDays = new Set(); // Keep track of days that have already been added

        schedules.forEach((item) => {
          const formattedDate = filterDateFormatter(item);
          const dayKey = `${formattedDate.month}-${formattedDate.day}`;

          if (!addedDays.has(dayKey)) {
            uniqueDates.add(formattedDate);
            addedDays.add(dayKey);
          }
        });

        setFilteredDates(Array.from(uniqueDates));
      }
    };

    populateFilterDates();
  }, [schedules]);

  const values = {
    schedules,
    addSchedule,
    addDate,
    deleteSchedule,

    filteredDates,
    filteredSchedules,
    isFilterApplied,
    selectedDate,
    applyFilter,
    setIsFilterApplied,
  };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
}
