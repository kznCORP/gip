import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

/* 
 Returns list of all Expense Categories
 Each category contains:
 - color: color for tags
 - title: title of category
 - total: sum of all expenses within specific category
 - items: an array that stores all child expenses.
*/
export async function getAllExpenses(setExpenses) {
  const collectionRef = collection(db, "expenses");
  const expensesQuery = query(collectionRef, orderBy("title"));

  const unsubscribe = onSnapshot(expensesQuery, async (snapshot) => {
    let allExpenses = [];

    for (const documentSnapshot of snapshot.docs) {
      const category = documentSnapshot.data();
      allExpenses.push({
        id: documentSnapshot.id,
        ...category,
      });
    }
    console.log("Retrieved all Expense categories from Firestore succesfully.");
    setExpenses(allExpenses);
  });

  return unsubscribe;
}
