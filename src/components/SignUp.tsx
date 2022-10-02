import { useReducer, useState } from "react";
import { firebaseRegistration } from "../utilities/firebase";
import {
  loginReginitialState,
  loginRegReducer,
  passwordValidator,
} from "../utilities/helpers";
import PasswordInput from "./PasswordInput";

function SignUp() {
  const [RegistrationResult, dispatch] = useReducer(
    loginRegReducer,
    loginReginitialState,
  );
  const [isLoading, setLoading] = useState(false);
  const [userInput, setUserInputs] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "reset" });

    if (passwordValidator(userInput.password)) {
      setLoading(true);
      firebaseRegistration(userInput, dispatch).finally(() => {
        setLoading(false);
      });
    } else {
      dispatch({
        type: "error",
        payload:
          "auth/password must contain at least an uppercase letter, a lowercase letter, a number and a special character (ex. Pass@123)",
      });
    }
  };

  return (
    <form onSubmit={(e) => handleRegistration(e)}>
      <input
        required
        type="text"
        name="name"
        id="name"
        value={userInput.name}
        onChange={handleChange}
        placeholder="Fullname"
      />
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
      <small
        className={`${
          RegistrationResult.isSuccess === true
            ? "alert success-alert"
            : RegistrationResult.isSuccess === false
            ? "alert error-alert"
            : ""
        }`}
      >
        {RegistrationResult?.message.substr(5).replace(/-/g, " ")}
      </small>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading.." : "Submit"}
      </button>
    </form>
  );
}

export default SignUp;
