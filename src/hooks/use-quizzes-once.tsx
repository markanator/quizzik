import { useEffect, useState } from "react";
import { db, firebase } from "../firebase";

interface IQuizes {
  status: "loading" | "success" | "error";
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | null;
  error: null;
}

interface IQuizResultsType {
  id: string;
  data: firebase.firestore.DocumentData;
}

function useQuizzesOnce() {
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

  let results: IQuizResultsType[] = [];
  if (snapshot !== null) {
    results = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data(),
    })) as any;
  }

  return {
    status,
    error,
    results,
    isEmpty: results.length === 0,
  };
}

export default useQuizzesOnce;
