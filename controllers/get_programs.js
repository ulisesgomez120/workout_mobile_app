import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const programs = collection(db, "programs");

async function get_programs(cb) {
  let docs = [];
  const snap = await getDocs(programs);
  snap.docs.forEach((d) => {
    docs.push({ ...d.data(), id: d.id });
  });
  console.log(docs);
  return docs;
  // cb(docs);
}

export { get_programs };
