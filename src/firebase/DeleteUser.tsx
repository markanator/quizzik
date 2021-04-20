import React, { ReactElement, useState } from "react";
import { db } from ".";

export default function DeleteUser(): ReactElement {
  const [userID, setUserId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userID) return;
    try {
      await db.collection("users").doc(userID).delete();
      console.log("deleted USER:: ", userID);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h3>Delete user:</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            User Id: <br />
            <input
              required
              type="text"
              name="userID"
              value={userID}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
          <br />
          <br />

          <button type="submit">Delete User</button>
        </form>
      </div>
    </div>
  );
}
