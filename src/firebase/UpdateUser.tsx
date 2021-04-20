import React, { ReactElement, useState } from "react";
import { db } from ".";

export default function UpdateUser(): ReactElement {
  const [formData, setFormData] = useState<IEditUser>({
    id: "",
    firstName: "",
    lastName: "",
    isOnline: false,
    highScore: 0,
    topics: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.firstName === "") return;
    try {
      await db.collection("users").doc(formData.id).update({
        isOnline: formData.isOnline,
      });

      console.log("Updated USER:: ", formData.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Update User</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            User Id: <br />
            <input
              required
              type="text"
              name="id"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Is Online?:{" "}
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.checked })
              }
            />
          </label>
          <br />
          <br />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

interface IEditUser {
  id: string;
  firstName: string;
  lastName: string;
  isOnline: boolean;
  highScore?: number;
  topics?: string[];
}
