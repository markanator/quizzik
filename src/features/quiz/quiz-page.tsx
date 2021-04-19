import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import Game from "./game";
import useQuizData from "./hooks/use-quiz-data";

function QuizPage() {
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
}

export default QuizPage;
