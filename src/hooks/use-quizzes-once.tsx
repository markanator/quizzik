import { useEffect, useState } from "react";
import { IQuizDataType, QuizType } from "types/LoadDateTypes";
import { IQuizes, UseQuizTypes } from "types/UseQuizOnce";
import { db } from "../firebase";

function useQuizzesOnce(): UseQuizTypes {
  const [quizzes, setQuizzes] = useState<IQuizes>({
    status: "loading",
    snapshot: null,
    error: null,
  });

  useEffect(() => {
    async function getCollection() {
      setQuizzes({ status: "loading", snapshot: null, error: null });
      try {
        const snapshot = await db.collection("quizzes").get();

        setQuizzes({ status: "success", snapshot, error: null });
      } catch (error) {
        console.error(error);
        setQuizzes({ status: "error", snapshot: null, error });
      }
    }
    getCollection();
  }, []);

  const { status, snapshot, error } = quizzes;

  let results: QuizType[] = [];
  if (snapshot !== null) {
    results = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data() as IQuizDataType,
    }));
  }

  return {
    status,
    error,
    results,
    isEmpty: results.length === 0,
  };
}

export default useQuizzesOnce;
