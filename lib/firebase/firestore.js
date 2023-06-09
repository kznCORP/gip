import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

/* 
 Updates data of Expense Item within Firebase
*/
export async function updateItem(expCategoryId, item) {
  const docRef = doc(db, "expenses", expCategoryId);
  try {
    await updateDoc(docRef, { ...item });
  } catch (e) {
    console.log(e.message);
  }
}

/* 
 Adds an Expense Category
 Each category contains:
 - color: color for tags
 - title: title of category
 - total: sum of all expenses within specific category
 - items: an array that stores all child expenses.
*/
export async function addCategory(category, user) {
  const collectionRef = collection(db, "expenses");
  try {
    await addDoc(collectionRef, { uid: user.uid, ...category, items: [] });
  } catch (e) {
    console.log(e.message);
  }
}

/* 
 Returns list of all Expense Categories
 Each category contains:
 - color: color for tags
 - title: title of category
 - total: sum of all expenses within specific category
 - items: an array that stores all child expenses.
*/
export async function getAllExpenses(setExpenses, uid) {
  const collectionRef = collection(db, "expenses");
  const expensesQuery = query(
    collectionRef,
    where("uid", "==", uid),
    orderBy("title")
  );

  try {
    const unsubscribe = onSnapshot(expensesQuery, async (snapshot) => {
      let allExpenses = [];

      for (const documentSnapshot of snapshot.docs) {
        const category = documentSnapshot.data();
        allExpenses.push({
          id: documentSnapshot.id,
          ...category,
        });
      }
      setExpenses(allExpenses);
    });

    return unsubscribe;
  } catch (e) {
    console.log(e.message);
  }
}

/*
 Removes an Expense Category from Firebase
*/
export async function deleteCategory(expenseCategoryId) {
  const docRef = doc(db, "expenses", expenseCategoryId);
  try {
    await deleteDoc(docRef);
  } catch (e) {
    console.log(e.message);
  }
}
