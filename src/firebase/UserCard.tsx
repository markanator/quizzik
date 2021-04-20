import React, { ReactElement } from "react";
import { firebase } from "../firebase";

interface Props {
  data: firebase.firestore.DocumentData;
}

export default function UserCard({ data }: Props): ReactElement {
  return (
    <div>
      <p>
        {data.firstName} {data.lastName} ({data.isOnline ? "Online" : "Offline"}
        )
      </p>
    </div>
  );
}
