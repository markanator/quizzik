import React from "react";
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

export interface IApiResponse {
  data: {
    message: string[];
    status: string;
  };
}

export interface IQuizStateTypes {
  isLoading: boolean;
  errorMessage: string | null;
  snapshot: null | QuestionDataType[];
}

export interface IFetchReturnTypes {
  response_code: number;
  results: QuestionDataType[];
}

interface IQuizBase {
  status: "loading" | "success" | "error";
  error: string | null;
}

export interface IQuizes extends IQuizBase {
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | null;
}

export interface UseQuizTypes extends IQuizBase {
  results: QuizType[];
  isEmpty: boolean;
}

type IUser = firebase.User;

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: firebase.auth.Error | null;
}

export interface IUserContext extends IUserState {
  isSignedIn: boolean;
  userId: string | undefined;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface IProviderProps {
  children: React.ReactNode;
}

export interface QuestionDataType {
  id: any;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
