import { firebase } from "../firebase";

export interface IQuizDataType {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  createdAt: firebase.firestore.Timestamp;
  lastModifiedAt: firebase.firestore.Timestamp;
  ownerId: string;
  ownerName: string;
  questions: QuestionType[];
}

export interface QuizType {
  id: string;
  data: IQuizDataType;
}

export interface QuestionType {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}
