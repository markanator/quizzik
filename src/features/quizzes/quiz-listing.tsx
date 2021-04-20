import { ReactElement } from "react";
import ErrorMessage from "../../components/error-message";
import LoadingSpinner from "../../components/loading-spinner";
import useQuizzesOnce from "../../hooks/use-quizzes-once";
import "./quiz-listing.css";
import QuizPreview from "./quiz-preview";

function QuizListing(): ReactElement {
  const quizzes = useQuizzesOnce();

  if (quizzes.status === "loading") return <LoadingSpinner />;
  if (quizzes.status === "error")
    return <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>;
  if (quizzes.isEmpty) return <p>No quizzes found!</p>;

  return (
    <ul className="quiz-listing">
      {quizzes.results.map((quiz) => (
        <li key={quiz.id}>
          <QuizPreview id={quiz.id} data={quiz.data} />
        </li>
      ))}
    </ul>
  );
}

export default QuizListing;
