import { useEffect, useState } from "react";
import { IQuizDataType, IQuizes, QuizType, UseQuizTypes } from "../types/types";
import { db } from "../firebase";

function useFetchManyQuizzes(): UseQuizTypes {
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

export default useFetchManyQuizzes;
