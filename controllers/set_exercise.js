import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";

const addExerciseToFirestore = async (exerciseData) => {
  try {
    const docRef = await addDoc(collection(db, "exercises"), exerciseData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
