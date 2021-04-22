import React, { ReactElement, useEffect, useState } from "react";
import { db } from ".";
import ErrorMessage from "../components/error-message";
import LoadingSpinner from "../components/loading-spinner";
import { firebase } from "../firebase";
import UserCard from "./UserCard";

export interface IQuery {
  isLoading: boolean;
  errorMessage: string;
  docSnapshots:
    | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
    | undefined;
}

export const GetAllUsers = (): ReactElement => {
  const [queryState, setQueryState] = useState<IQuery>({
    isLoading: true,
    errorMessage: "",
    docSnapshots: undefined,
  });

  useEffect(() => {
    async function getAllUsers() {
      try {
        setQueryState({
          isLoading: false,
          docSnapshots: undefined,
          errorMessage: "",
        });
        const docSnapshots = await db.collection("users").get();

        setQueryState({
          isLoading: false,
          errorMessage: "",
          docSnapshots: docSnapshots.docs,
        });
      } catch (error) {
        console.error(error);

        setQueryState({
          isLoading: false,
          errorMessage: "Unable to connect to firestore. Please try again.",
          docSnapshots: undefined,
        });
      }
    }
    getAllUsers();
  }, []);

  let contents;
  const { isLoading, errorMessage, docSnapshots } = queryState;
  if (isLoading) return <LoadingSpinner />;
  else if (errorMessage) return <ErrorMessage>{errorMessage}</ErrorMessage>;
  else if (!docSnapshots) return <ErrorMessage>Nothing found</ErrorMessage>;
  else
    contents = docSnapshots.map((user) => (
      <UserCard key={user.id} data={user.data()} />
    ));

  return (
    <div>
      <h3>Read All Users</h3>
      {/* <button onClick={handleClick}>Read Users</button> */}
      {contents}
    </div>
  );
};
