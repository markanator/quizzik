import { QuestionDataType } from "utils/decodeTriviaData";

export interface IQuizStateTypes {
  isLoading: boolean;
  errorMessage: string;
  data: null | QuestionDataType[];
}

export interface IFetchReturnTypes {
  response_code: number;
  results: QuestionDataType[];
}
