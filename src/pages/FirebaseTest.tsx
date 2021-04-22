import React, { ReactElement } from "react";
import CreateNewUser from "../firebase/CreateNewUser";
import DeleteUser from "../firebase/DeleteUser";
import { GetAllUsers } from "../firebase/getAllUsers";
import GetOneUser from "../firebase/GetOneUser";
import UpdateUser from "../firebase/UpdateUser";

const FirebaseTest = (): ReactElement => {
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
