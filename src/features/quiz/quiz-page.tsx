import { FC } from "react";
import ErrorMessage from "../../components/error-message";
import LoadingSpinner from "../../components/loading-spinner";
import useQuizData from "../../hooks/use-quiz-data";
import Game from "./game";

const QuizPage: FC = () => {
  const { isLoading, errorMessage, data } = useQuizData();

  let contents;
  if (isLoading) contents = <LoadingSpinner />;
  else if (errorMessage !== "")
    contents = <ErrorMessage>{errorMessage}</ErrorMessage>;
  else if (data === null)
    contents = <ErrorMessage>No data returned, try again later.</ErrorMessage>;
  else contents = <Game triviaData={data} />;

  return (
    <>
      <main>{contents}</main>
    </>
  );
};

export default QuizPage;
