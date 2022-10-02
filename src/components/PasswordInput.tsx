import React, { useState } from "react";
import { Eye, EyeSlash } from "../utilities/Icons";

interface PasswordInputPropTypes {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
function PasswordInput({ value, handleChange }: PasswordInputPropTypes) {
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleShowPass = () => {
    setShowPass((show) => !show);
    const x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <div className="d-flex">
      <input
        required
        type="password"
        name="password"
        id="password"
        minLength={8}
        value={value}
        onChange={handleChange}
        placeholder="Password"
      />{" "}
      &nbsp;&nbsp;
      {!showPass ? (
        <Eye onClick={handleShowPass} />
      ) : (
        <EyeSlash onClick={handleShowPass} />
      )}
    </div>
  );
}

export default PasswordInput;
