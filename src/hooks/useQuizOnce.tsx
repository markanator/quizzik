import { db, firebase } from "../firebase";
import { useEffect, useState } from "react";
import { IFormValues } from "features/edit-quiz/QuizForm";
// import { IQuizDataType } from "types/types";

interface QuizReturn {
  id: string | undefined;
  exists: boolean;
  data: firebase.firestore.DocumentData | undefined;
  status: string;
  error: firebase.auth.Error | null;
  set: (arg0: { title: string }) => Promise<void>;
  delete: () => Promise<void>;
}
interface IFetchQuizState {
  status: "loading" | "success" | "error" | "deleting" | "updating" | "deleted";
  snapshot: null | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
  error: firebase.auth.Error | null;
}

function useQuizOnce(quizId: string): QuizReturn {
  const [quizState, setQuizState] = useState<IFetchQuizState>({
    status: "loading",
    snapshot: null,
    error: null,
  });

  useEffect(() => {
    async function getDoc() {
      setQuizState({ status: "loading", snapshot: null, error: null });
      try {
        const snapshot = await db.collection("quizzes").doc(quizId).get();
        setQuizState({ status: "success", snapshot, error: null });
      } catch (error) {
        console.error(error);
        setQuizState({ status: "error", snapshot: null, error });
      }
    }
    getDoc();
  }, [quizId]);

  const setQuiz = async (newQuizData: IFormValues): Promise<void> => {
    setQuizState((prev) => ({ ...prev, status: "updating", error: null }));
    try {
      await db
        .collection("quizzes")
        .doc(quizId)
        .set(newQuizData, { merge: true });

      setQuizState((prev) => ({
        ...prev,
        error: null,
        status: "success",
      }));
    } catch (error) {
      console.log(error);
      setQuizState((prev) => ({
        ...prev,
        error,
        snapshot: null,
        status: "error",
      }));
    }
  };
  const deleteQuiz = async (): Promise<void> => {
    // setQuizState({ status: "loading", error: null, snapshot: snappy });
    setQuizState((prev) => ({ ...prev, status: "deleting", error: null }));
    try {
      await db.collection("quizzes").doc(quizId).delete();
      setQuizState({ status: "deleted", error: null, snapshot: null });
    } catch (error) {
      console.error(error);
      setQuizState((prev) => ({
        ...prev,
        error,
        snapshot: null,
        status: "error",
      }));
    }
  };

  const { status, snapshot, error } = quizState;

  let id;
  let exists = false;
  let data;
  if (snapshot) {
    id = snapshot.id;
    exists = snapshot.exists;
    data = snapshot.data();
  }

  return {
    id,
    exists,
    data,
    status,
    error,
    set: setQuiz,
    delete: deleteQuiz,
  };
}

export default useQuizOnce;
