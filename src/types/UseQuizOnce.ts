import { firebase } from "../firebase";

interface IQuizBase {
  status: "loading" | "success" | "error";
  error: string | null;
}

export interface IQuizes extends IQuizBase {
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | null;
}

export interface IQuizResultsType {
  id: string;
  data: firebase.firestore.DocumentData;
}

export interface UseQuizTypes extends IQuizBase {
  results: IQuizResultsType[];
  isEmpty: boolean;
}
