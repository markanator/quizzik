import React, { ReactElement, useState } from "react";
import { db } from ".";
import ErrorMessage from "../components/error-message";
import LoadingSpinner from "../components/loading-spinner";
import { firebase } from "../firebase";
import UserCard from "./UserCard";

export interface IQuery {
  isLoading: boolean;
  errorMessage: string;
  docSnapshot:
    | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    | undefined;
}

export default function GetOneUser(): ReactElement {
  const [userId, setUserId] = useState("");
  const [queryState, setQueryState] = useState<IQuery>({
    isLoading: false,
    errorMessage: "",
    docSnapshot: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setQueryState({
        isLoading: true,
        errorMessage: "",
        docSnapshot: undefined,
      });
      const docSnapshot = await db.collection("users").doc(userId).get();
      setQueryState({
        isLoading: false,
        errorMessage: "",
        docSnapshot,
      });
      if (!docSnapshot.exists) {
        console.error("Nothing exists");
      } else {
        console.log("HAZAA!");
      }
    } catch (error) {
      console.error(error);
      setQueryState({
        isLoading: false,
        errorMessage: "Could not connect to firestore!",
        docSnapshot: undefined,
      });
    }
  };
  const { docSnapshot, errorMessage, isLoading } = queryState;
  let contents;

  if (isLoading) return <LoadingSpinner />;
  else if (errorMessage) contents = <ErrorMessage>{errorMessage}</ErrorMessage>;
  else if (docSnapshot === undefined) contents = <p>Search for a user!</p>;
  else if (!docSnapshot.exists) contents = <p>No User found</p>;
  else contents = <UserCard data={docSnapshot.data() as any} />;

  return (
    <div>
      <h3>Read 1 User</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId"></label>
        <input
          type="text"
          name="userId"
          value={userId}
          placeholder="firestore user id"
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <button type="submit">Get 1 User</button>
      </form>
      <>{contents}</>
    </div>
  );
}
