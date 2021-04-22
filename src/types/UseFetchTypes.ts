export interface IDogStateTypes {
  isLoading: boolean;
  isError: boolean;
  statusMessage: string;
  data: null | string[];
}

export interface IApiResponse {
  data: {
    message: string[];
    status: string;
  };
}
