import { runTransaction, addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

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
