import { getNewQuizId, getServerTimeStamp } from "../firebase";
import useQuizOnce from "hooks/useQuizOnce";
import useUser from "hooks/useUser";
import React, { ReactElement, useState } from "react";
import { useParams } from "react-router";
import QuizForm from "features/edit-quiz/QuizForm";
import LoadingSpinner from "components/loading-spinner";

interface ParamTypes {
  id: string;
}

const EditPage = (): ReactElement => {
  // quiz id
  const { id } = useParams<ParamTypes>();
  const isNew = id === "new";
  const [quizId] = useState(() => (isNew ? getNewQuizId() : id));

  const quiz = useQuizOnce(quizId);
  const { userId, user } = useUser();

  const saveQuiz = (newQuizData: any) => {
    console.log("Save!");
    const ownerId = userId;
    const ownerName = user?.displayName;
    const lastModified = getServerTimeStamp();
    const data = { ...newQuizData, ownerId, ownerName, lastModified };
    if (!quiz.exists) data.createdAt = lastModified;

    quiz.set(data);
  };
  const deleteQuiz = () => {
    console.log("Delete!");
    quiz.delete();
  };

  if (quiz.status === "loading") return <LoadingSpinner />;
  if (
    quiz.status === "success" &&
    quiz.exists &&
    quiz.data.ownerId !== user?.uid
  ) {
    return (
      <main>
        <h1>Edit Quiz</h1>
        <p>You don't have permissions to edit "{quiz.data.title}!"</p>
      </main>
    );
  }
  let message: ReactElement | null = null;
  if (quiz.status === "deleting") message = <p>Deleting...</p>;
  else if (quiz.status === "deleted") message = <p>Deleted!</p>;
  else if (quiz.status === "error")
    message = <p>Something went wrong. Please try again later.</p>;

  return (
    <main>
      <h1>Edit Quiz</h1>
      {message}
      <QuizForm
        initialData={quiz.data}
        onSave={saveQuiz}
        onDelete={deleteQuiz}
        isSaving={quiz.status === "updating"}
      />
    </main>
  );
};

export default EditPage;
