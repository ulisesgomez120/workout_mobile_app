import { db } from "../firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

async function get_history(exercise_id) {
  const qry = query(
    collection(db, "past_workouts"),
    where("workout_id", "==", exercise_id),
    orderBy("created_on", "desc")
  );
  let docs = [];
  const snap = await getDocs(qry);
  snap.docs.forEach((d) => {
    docs.push({ ...d.data(), id: d.id });
  });
  return docs;
}

export { get_history };
