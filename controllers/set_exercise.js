import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const add_completed_exercise = async (exercise) => {
  try {
    if (!exercise) {
      return;
    }
    exercise["created_on"] = Timestamp.now();
    const docRef = await addDoc(collection(db, "past_workouts"), exercise);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { add_completed_exercise };
