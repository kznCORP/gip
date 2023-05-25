import {
  addDoc,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/* 
 Adds expense to Firestore with given information:
 - title: name of expense
 - amount: amount of expense
 - date: date of purchase
*/
export async function addNewExpense(title, amount, date) {
  const collectionRef = collection(db, "expenses");

  try {
    await addDoc(collectionRef, {
      title,
      amount,
      date,
    });

    console.log("Expense added to Firestore succesfully.");
  } catch (e) {
    console.log("Attempt to add to Firestore failed: ", e);
  }
}

/* 
 Updates expense to Firestore with given information:
 - title: name of expense
 - amount: amount of expense
 - date: date of purchase
*/
export async function updateExpense(title, amount, date) {
  const collectionRef = collection(db, "expenses");

  try {
    await setDoc(collectionRef, {
      title,
      amount,
      date,
    });

    console.log("Expense updated succesfully.");
  } catch (e) {
    console.log("Attempt to update document failed: ", e);
  }
}

/* 
 Returns list of all Expenses
 Each expense contains:
 - title: name of expense
 - amount: amount of expense
 - date: date of purchase
*/
export async function getAllExpenses(setExpenses) {
  const collectionRef = collection(db, "expenses");
  const expenseQuery = query(collectionRef, orderBy("date"));

  const unsubscribe = onSnapshot(expenseQuery, async (snapshot) => {
    let allExpenses = [];

    for (const documentSnapshot of snapshot.docs) {
      const expense = documentSnapshot.data();
      allExpenses.push({
        id: documentSnapshot.id,
        ...expense,
      });
    }
    console.log("Retrieved all documents from Firestore succesfully.");
    setExpenses(allExpenses);
  });

  return unsubscribe;
}

// Deletes receipt with given @id.
export async function deleteExpense(id) {
  const documentRef = doc(db, "expenses", id);
  try {
    await deleteDoc(documentRef);
    console.log("Deleted document from Firestore succesfully.");
  } catch (e) {
    console.log("Attempt to delete document from Firestore failed: ", e);
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
export async function getExpenseCategories(setExpCategory) {
  const collectionRef = collection(db, "expenses");
  const categoryQuery = query(collectionRef, orderBy("title"));

  const unsubscribe = onSnapshot(categoryQuery, async (snapshot) => {
    let allExpCategories = [];

    for (const documentSnapshot of snapshot.docs) {
      const category = documentSnapshot.data();
      allExpCategories.push({
        id: documentSnapshot.id,
        ...category,
      });
    }
    console.log("Retrieved all Expense categories from Firestore succesfully.");
    setExpCategory(allExpCategories);
  });

  return unsubscribe;
}
