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
