import React, { useState, useReducer } from "react";
import { firebaseLogin } from "../firebase";
import { loginReginitialState, loginRegReducer } from "../helpers";

const Login = () => {
  const [LoginResult, dispatch] = useReducer(
    loginRegReducer,
    loginReginitialState
  );
  const [isLoading, setLoading] = useState(false);
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
    dispatch({ type: "reset" });
    const { email, password } = userInput;

    setLoading(true);
    firebaseLogin(email, password)
      .then((userCredential) => {
        dispatch({
          type: "success",
          payload: "auth/Login Success",
        });
        // console.log(userCredential.user);
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: error.code,
        });
        // console.log(error.message, error.code);
      })
      .finally(() => {
        setLoading(false);
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
        required
        type="password"
        name="password"
        id="password"
        // minLength={8}
        value={userInput.password}
        onChange={handleChange}
        placeholder="*****"
      />
      <small
        className={`${
          LoginResult.isSuccess === true
            ? "alert success-alert"
            : LoginResult.isSuccess === false
            ? "alert error-alert"
            : ""
        }`}
      >
        {LoginResult?.message.substr(5).replace(/-/g, " ")}
      </small>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading.." : "Submit"}
      </button>
    </form>
  );
};

export default Login;
