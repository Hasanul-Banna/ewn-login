import { useReducer, useState } from "react";
import { firebaseLogin, sendForgetPassEmail } from "../utilities/firebase";
import { loginReginitialState, loginRegReducer } from "../utilities/helpers";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const [LoginResult, dispatch] = useReducer(
    loginRegReducer,
    loginReginitialState,
  );
  const [isLoading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const rememberedEmailPass = JSON.parse(
    localStorage.getItem("rememberedEmailPass"),
  );

  const [userInput, setUserInputs] = useState<{
    email: string;
    password: string;
  }>({
    email: rememberedEmailPass?.email || "",
    password: rememberedEmailPass?.password || "",
  });
  const { email, password } = userInput;

  const handleChange = (e) => {
    setUserInputs({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem(
        "rememberedEmailPass",
        JSON.stringify({ email, password }),
      );
    } else {
      localStorage.removeItem("rememberedEmailPass");
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "reset" });

    setLoading(true);
    firebaseLogin(email, password)
      .then((userCredential) => {
        dispatch({
          type: "success",
          payload: "auth/Login Success",
        });
        handleRememberMe();
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: error.code,
        });
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
      <PasswordInput value={userInput.password} handleChange={handleChange} />
      <div className="d-flex">
        <div className="Remember">
          <input
            type="checkbox"
            name="Remember"
            id="Remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
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
