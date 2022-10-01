import React, { useState } from "react";
import { firebaseRegistration } from "../firebase";

const SignUp = () => {
  const [signupErr, setSignupErr] = useState("");
  const [userInput, setUserInputs] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "Hasanul Banna",
    email: "hasanulbanna006@gmail.com",
    password: "121212",
  });

  const handleChange = (e) => {
    setUserInputs({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleRegistration = (e) => {
    e.preventDefault();

    firebaseRegistration(userInput, setSignupErr).finally(() => {
      alert("ok");
      console.log();
    });
    //   .then((result) => {
    //     console.log(result);
    //   })
  };
  
  return (
    <form onSubmit={(e) => handleRegistration(e)}>
      <input
        type="text"
        name="name"
        id="name"
        value={userInput.name}
        onChange={handleChange}
        placeholder="John Doe"
      />
      <span>{signupErr.substr(5)}</span>
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
        placeholder="******"
      />
      <button type="submit">SignUp</button>
    </form>
  );
};

export default SignUp;
