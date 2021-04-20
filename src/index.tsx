import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { db } from "./firebase";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <>
      <App />
    </>
  </React.StrictMode>,
  document.querySelector("#root")
);

// async function ReadOneUser(id: string) {
//   try {
//     const snapshot = await db.collection("users").doc(id).get();

//     if (!snapshot.exists) {
//       console.log("Nothing found for id: ", id);
//     } else {
//       console.log("Success, found the user!");
//       console.log(snapshot.id);
//       console.log(snapshot.data());
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// ReadOneUser("I1fg60L123iFAVDNdFGY");
