import {
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
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
    const newExpense = await addDoc(collectionRef, {
      title,
      amount,
      date,
    });

    console.log("Succesfully added to the database.");
  } catch (e) {
    console.log("Unable to add to database: ", e);
  }
}

/* 
 Returns list of all Expenses
 Each expense contains:
 - title: name of expense
 - amount: amount of expense
 - date: date of purchase
*/
export async function getAllExpenses(setAllExpenses) {
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

    setAllExpenses(allExpenses);
  });

  return unsubscribe;
}

//
// try {
//   await runTransaction(db, async (transaction) => {

//     const sfDoc = await transaction.get(sfDocRef);
//     if (!sfDoc.exists()) {
//       throw "Document does not exist!";
//     }

//     const newPopulation = sfDoc.data().population + 1;
//     transaction.update(sfDocRef, { population: newPopulation });
//   });

//   console.log("Transaction successfully committed!");
// } catch (e) {
//   console.log("Transaction failed: ", e);
// }
