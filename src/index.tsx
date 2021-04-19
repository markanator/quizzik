import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { db } from "./data/firebase";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);

// console.log(db);
async function readAllUsers() {
  try {
    const snapshot = await db.collection("users").get();
    const docs = snapshot.docs;

    console.log(`Found ${docs.length}x user(s).`);
    docs.forEach((person) => {
      const data = person.data();

      console.log(`
User with ID: ${person.id}
---
Name: ${data.firstName} ${data.lastName}
High score: ${data.highScore}`);
    });
  } catch (err) {
    console.error(err);
  }
}

readAllUsers();
