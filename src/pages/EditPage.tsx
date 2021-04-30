import useQuizOnce from "hooks/useQuizOnce";
import useUser from "hooks/useUser";
import React, { ReactElement } from "react";
import { useParams } from "react-router";

interface ParamTypes {
  id: string;
}

const EditPage = (): ReactElement => {
  // quiz id
  const { id } = useParams<ParamTypes>();
  const isNew = id === "new";
  // quiz data
  const quiz = useQuizOnce(id);
  // user id
  const { userId, user } = useUser();

  return (
    <div>
      <h1>Edit page</h1>
      <p>User id: {userId}</p>
      <p>Display Name id: {user?.displayName}</p>
      <p>Param Id: {id}</p>
      <p>is this a new quiz? {isNew ? "Yes" : "No"}</p>
      <p>Quiz status: {quiz.status}</p>
      <p>Quiz exsists: {quiz.exists ? "Yes" : "No"}</p>
      {quiz.data ? (
        <pre>{JSON.stringify(quiz.data, null, 2)}</pre>
      ) : (
        <p>Nothing found...</p>
      )}

      <button onClick={quiz.delete}>Delete</button>
      <button onClick={() => quiz.set({ title: "test" })}>Update</button>
    </div>
  );
};

export default EditPage;
