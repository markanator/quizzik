import { useEffect, useState } from "react";
import decodeTriviaData from "../utils/decodeTriviaData";
import fetcher from "../utils/fetcher";
// import decodeTriviaData from "../decodeTriviaData";
// import fetcher from "../../utils/fetcher";

interface IQuizStateTypes {
  isLoading: boolean;
  errorMessage: string;
  data: null | any[];
}

interface IFetchReturnTypes {
  response_code: number;
  results: any[];
}

function useQuizData(amount = 5, difficulty = "") {
  const [quizFetch, setQuizFetch] = useState<IQuizStateTypes>({
    isLoading: true,
    errorMessage: "",
    data: null,
  });

  useEffect(() => {
    async function main() {
      const params = new URLSearchParams({
        amount: `${amount}`,
        type: "multiple",
      });
      if (difficulty !== "") params.append("difficulty", difficulty);
      const url: string = `https://opentdb.com/api.php?${params.toString()}`;
      try {
        //! custom fetcher
        const json = await fetcher(url);

        const { response_code, results }: IFetchReturnTypes = json;

        // Stops the chain of thens and kicks things over to the catch.
        if (response_code === 1) {
          throw Error("Bad API request - no results.");
        } else if (response_code === 2) {
          throw Error("Bad API request - invalid parameter.");
        }

        setQuizFetch({
          isLoading: false,
          errorMessage: "",
          data: decodeTriviaData(results),
        });
      } catch (error) {
        setQuizFetch({
          isLoading: false,
          errorMessage:
            "Something went wrong loading the quiz data please try again.",
          data: null,
        });
        console.error(error);
      }
    }

    main();
  }, [amount, difficulty]);

  return quizFetch;
}

export default useQuizData;
