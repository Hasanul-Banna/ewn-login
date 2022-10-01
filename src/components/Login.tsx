import React, { useState } from "react";
import { firebaseLogin } from "../firebase";

const Login = () => {
  const [userInput, setUserInputs] = useState<{
    email: string;
    password: string;
  }>({
    email: "banna@gmail.com",
    password: "121212",
  });

  const handleChange = (e) => {
    setUserInputs({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = userInput;

    firebaseLogin(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message, error.code);
      });
  };
  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <input
        type="email"
        name="email"
        id="email"
        value={userInput.email}
        onChange={handleChange}
        placeholder="example@email.com"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={userInput.password}
        onChange={handleChange}
        placeholder="*****"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
