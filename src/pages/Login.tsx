import React, { useContext, useState } from "react";
import { AccountContext } from "../components/Account";
import "./Login.css";
import { CognitoUserSession } from "amazon-cognito-identity-js";

interface LoginProps {
  setMyHandle: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setMyHandle }) => {
  document.title = "Login / Bitter";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { authenticate, setIsLoggedIn } = useContext(AccountContext);

  const onSubmit = (event: any) => {
    event.preventDefault();

    authenticate(username, password)
      .then((data: CognitoUserSession) => {
        console.log("Logged in!", data);
        setIsLoggedIn(true);
        setMyHandle(data.getIdToken().payload["cognito:username"]);
      })
      .catch((err: any) => {
        console.error("Failed to login!", err);
      });
  };

  return (
    <div className="login">
      <div className="login-title">Login</div>

      <form onSubmit={onSubmit}>
        <div className="login-input-field">
          <div className="login-input-label">Email / Handle:</div>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
          />
        </div>

        <div className="login-input-field">
          <div className="login-input-label">Password:</div>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
