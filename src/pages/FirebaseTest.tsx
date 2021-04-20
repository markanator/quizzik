import React from "react";
import CreateNewUser from "../firebase/CreateNewUser";
import DeleteUser from "../firebase/DeleteUser";
import { GetAllUsers } from "../firebase/getAllUsers";
import GetOneUser from "../firebase/GetOneUser";
import UpdateUser from "../firebase/UpdateUser";

interface Props {}

const FirebaseTest = (props: Props) => {
  return (
    <div>
      <GetAllUsers />
      <hr />
      <GetOneUser />
      <hr />
      <CreateNewUser />
      <hr />
      <UpdateUser />
      <hr />
      <DeleteUser />
    </div>
  );
};

export default FirebaseTest;
