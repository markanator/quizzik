import React from "react";
import { GetAllUsers } from "../firebase/getAllUsers";
import GetOneUser from "../firebase/GetOneUser";

interface Props {}

const FirebaseTest = (props: Props) => {
  return (
    <div>
      <GetAllUsers />
      <GetOneUser />
    </div>
  );
};

export default FirebaseTest;
