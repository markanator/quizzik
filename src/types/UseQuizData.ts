export interface IQuizStateTypes {
  isLoading: boolean;
  errorMessage: string;
  data: null | any[];
}

export interface IFetchReturnTypes {
  response_code: number;
  results: string[];
}
