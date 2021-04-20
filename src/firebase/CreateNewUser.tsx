import React, { ReactElement, useState } from "react";
import { db } from ".";

export default function CreateNewUser(): ReactElement {
  const [formData, setFormData] = useState<INewUser>({
    firstName: "",
    lastName: "",
    isOnline: true,
    highScore: 0,
    topics: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await db.collection("users").add(formData);
      console.log("ADDED USER", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Create new User!</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            First Name: <br />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Last Name: <br />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </label>
          <br />
          <br />

          <button type="submit">Create New User</button>
        </form>
      </div>
    </div>
  );
}

interface INewUser {
  firstName: string;
  lastName?: string;
  isOnline: boolean;
  highScore?: number;
  topics?: string[];
}

// async function createUser(user: INewUser) {
//   try {
//     const docRef = await db.collection("users").add(user);
//     console.log("ADDED USER", docRef.id);
//   } catch (error) {
//     console.log(error);
//   }
// }
