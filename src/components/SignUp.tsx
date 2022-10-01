import React, { useReducer, useState } from "react";
import { firebaseRegistration } from "../firebase";
import {
  loginReginitialState,
  loginRegReducer,
  passwordValidator,
} from "../helpers";

const SignUp = () => {
  const [RegistrationResult, dispatch] = useReducer(
    loginRegReducer,
    loginReginitialState
  );

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
    if (passwordValidator(userInput.password)) {
      firebaseRegistration(userInput, dispatch).finally(() => {
        console.log();
      });
    } else {
      dispatch({
        type: "error",
        payload:
          "auth/password must contain at least an uppercase letter, a lowercase letter, a number and a special character",
      });
    }
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
      <input
        type="email"
        name="email"
        id="email"
        value={userInput.email}
        onChange={handleChange}
        placeholder="example@email.com"
      />
      <input
        required
        type="password"
        name="password"
        id="password"
        minLength={8}
        value={userInput.password}
        onChange={handleChange}
        placeholder="******"
      />
      <small>{RegistrationResult?.message.substr(5).replace(/-/g, " ")}</small>
      <button type="submit">SignUp</button>
    </form>
  );
};

export default SignUp;
