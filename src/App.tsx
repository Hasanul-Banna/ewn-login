import React, { FC, useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App: FC = () => {
  const [isloginTab, setIsLoginTab] = useState(true);
  return (
    <main className="home">
      <div className="login-form">
        {["Login", "Sign Up"].map((item, index) => (
          <span
            className={`tab-title ${
              index === (isloginTab ? 0 : 1) && "tab-toggle"
            }`}
            key={index}
            onClick={() => setIsLoginTab(index === 0)}
          >
            {item}
          </span>
        ))}
        <div>{isloginTab ? <Login /> : <SignUp />}</div>
      </div>
    </main>
  );
};

export default App;
