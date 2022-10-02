import React, { useState, useReducer } from "react";
import { firebaseLogin, sendForgetPassEmail } from "../utilities/firebase";
import { loginReginitialState, loginRegReducer } from "../utilities/helpers";

const Login = () => {
  const [LoginResult, dispatch] = useReducer(
    loginRegReducer,
    loginReginitialState
  );
  const [isLoading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [userInput, setUserInputs] = useState<{
    email: string;
    password: string;
  }>({
    email: "hasanulbanna006@gmail.com",
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

  const handleForgetPass = () => {
    dispatch({ type: "reset" });
    setSendingEmail(true);
    sendForgetPassEmail(userInput.email)
      .then(() => {
        dispatch({
          type: "success",
          payload:
            "auth/Please check your email inbox or spam box for password reset link.",
        });
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: error.code,
        });
      })
      .finally(() => {
        setSendingEmail(false);
      });
  };
  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <input
        required
        type="email"
        name="email"
        id="email"
        value={userInput.email}
        onChange={handleChange}
        placeholder="Email Address"
      />
      <input
        required
        type="password"
        name="password"
        id="password"
        // minLength={8}
        value={userInput.password}
        onChange={handleChange}
        placeholder="●●●●●●●●"
      />
      <div className="d-flex">
        <div className="Remember">
          <input type="checkbox" name="Remember" id="Remember" />
          &nbsp;
          <label htmlFor="Remember">
            <small>Remember me</small>
          </label>
        </div>
        {!sendingEmail ? (
          <small className="forgot-pass" onClick={handleForgetPass}>
            Forgot password?
          </small>
        ) : (
          <small style={{ marginTop: "4px" }}>Sending email...</small>
        )}
      </div>
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
