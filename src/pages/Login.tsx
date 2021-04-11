import React, { useContext, useState } from "react";
import { AccountContext } from "../components/Account";
import { Link } from "react-router-dom";
import "./Login.css";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import ContextProps from "../Types/ContextProps";

interface LoginProps {
  setMyHandle: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setMyHandle }) => {
  document.title = "Login / Bitter";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [invalidLoginDetails, setInvalidLoginDetails] = useState<boolean>(
    false
  );

  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const { authenticate, setIsLoggedIn, setIsAdmin }: ContextProps = useContext(
    AccountContext
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authenticate(username, password)
      .then((data: CognitoUserSession) => {
        console.log("Logged in!");
        setMyHandle(data.getIdToken().payload["cognito:username"]);
        if (data.getIdToken().payload["custom:role"] === "admin")
          setIsAdmin(true);
        setIsLoggedIn(true);
      })
      .catch((err: any) => {
        const code: string = err.code;
        switch (code) {
          case "UserNotConfirmedException":
            console.error("Email not verified");
            setEmailNotVerified(true);
            break;
          case "NotAuthorizedException":
            console.error("Incorrect username or password");
            setInvalidLoginDetails(true);
            break;
          default:
            console.error("Failed to login!", err);
            setErrorOccurred(true);
        }
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
            onChange={(event) => {
              setEmailNotVerified(false);
              setInvalidLoginDetails(false);
              setUsername(event.target.value);
              setErrorOccurred(false);
            }}
            type="text"
            className={emailNotVerified || invalidLoginDetails ? "invalid" : ""}
          />

          {/* Account not verified */}
          {emailNotVerified ? (
            <div className="form-error-message">
              You need to verify your email before logging in
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="login-input-field">
          <div className="login-input-label">Password:</div>
          <input
            value={password}
            onChange={(event) => {
              setInvalidLoginDetails(false);
              setPassword(event.target.value);
              setErrorOccurred(false);
            }}
            type="password"
            className={invalidLoginDetails ? "invalid" : ""}
          />

          {/* Invalid login details */}
          {invalidLoginDetails ? (
            <div className="form-error-message">
              Incorrect username or password
            </div>
          ) : (
            ""
          )}
        </div>

        <button type="submit">Submit</button>
        <div id="login-register-link">
          <Link to="/register">Create an account</Link>
        </div>

        {/* Error message */}
        {errorOccurred ? (
          <div className="form-error-message">An error occurred.</div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Login;
