import React, { ReactElement } from "react";
import { firebase } from "../firebase";

interface Props extends firebase.firestore.DocumentData {
  // data: firebase.firestore.DocumentData;
  data: any;
}

export default function UserCard({ data }: Props): ReactElement {
  return (
    <div>
      <p>
        {data?.firstName} {data?.lastName} (
        {data?.isOnline ? "Online" : "Offline"})
      </p>
    </div>
  );
}
