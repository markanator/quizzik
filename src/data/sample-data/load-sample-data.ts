import { db } from "../../firebase";
import quizzes from "./sample-quizzes";

/**
 * This is intended to be a very simple way to load some sample data into a Firestore database. It
 * will inject quizzes under set keys. This could potential override existing data! You should not
 * run this in production. If you want a better way to manage data during development, check out
 * Firebase's local development tool.
 */
async function loadSampleData(): Promise<void> {
  console.log("Loading sample quizzes into firestore...");

  // eslint-disable-next-line prefer-const
  for (const { id, data } of quizzes) {
    try {
      await db.collection("quizzes").doc(id).set(data);
    } catch (error) {
      console.error(error);
      console.error("Could not load sample data!");
      return;
    }
  }

  console.log("Done loading sample quizzes!");
}

export default loadSampleData;
