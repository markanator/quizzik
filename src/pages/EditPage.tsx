import { getNewQuizId } from "../firebase";
import useQuizOnce from "hooks/useQuizOnce";
import useUser from "hooks/useUser";
import React, { ReactElement, useState } from "react";
import { useParams } from "react-router";

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

  return (
    <div>
      <h1>Edit page</h1>
      <p>User id: {userId}</p>
      <p>Display Name id: {user?.displayName}</p>
      <p>quiz Id: {quizId}</p>
      <p>is this a new quiz? {isNew ? "Yes" : "No"}</p>
      <p>Quiz status: {quiz.status}</p>
      <p>Quiz exsists: {quiz.exists ? "Yes" : "No"}</p>
      <button onClick={quiz.delete}>Delete</button>
      <button onClick={() => quiz.set({ title: "test" })}>Update</button>
    </div>
  );
};

export default EditPage;
