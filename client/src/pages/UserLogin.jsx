import React, { useState } from "react";
import useAuthStore from "../store/authStore";

const UserLogin = () => {
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  const { login, setEmail, setPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDEfault();
    setEmail(localEmail);
    setPassword(localPassword);

    const result = await login(localEmail, localPassword);
    console.log("Result: ", result);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="text"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="">Email</label>
        <input
          type="password"
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default UserLogin;
