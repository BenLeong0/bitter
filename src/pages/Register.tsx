import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CoreService from "../components/core/CoreService";
import UserPool from "../UserPool";
import "./Register.css";

const Register: React.FC<{}> = () => {
  const coreService = new CoreService();
  document.title = "Register / Bitter";

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isUsernameEmpty, setIsUsernameEmpty] = useState<boolean>(false);
  const [isUsernameTooLong, setIsUsernameTooLong] = useState<boolean>(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(false);

  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [passwordsMismatch, setPasswordsMismatch] = useState<boolean>(false);

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check fields not empty and passwords match
    if (areFieldsValid()) {
      console.log("Empty fields!");
      return;
    }

    // Check if email exists
    if (await coreService.isEmailUsed(email)) {
      setEmailExists(true);
      return;
    }

    // Register
    UserPool.signUp(
      username,
      password,
      [new CognitoUserAttribute({ Name: "email", Value: email })],
      [],
      (err: any, data) => {
        if (err) {
          const code = err.code;
          console.log(err);

          switch (code) {
            case "UsernameExistsException":
              setUsernameExists(true);
              break;
            case "InvalidPasswordException":
              setIsPasswordValid(false);
              break;
            default:
              // MAKE GENERAL ERROR MESSAGE FOR IF THIS OCCURS !!!!!
              console.log("an error occured");
              setErrorOccurred(true);
          }
        }
        if (data) {
          setHasSucceeded(true);
        }
      }
    );
  };

  const areFieldsValid = () => {
    let result: boolean = false;

    if (username.length < 1) {
      console.log("no handle!");
      setIsUsernameEmpty(true);
      result = true;
    } else if (username.length > 25) {
      console.log("handle too long!");
      setIsUsernameTooLong(true);
      result = true;
    } else if (!checkIsHandleValid(username)) {
      console.log("invalid handle");
      setIsUsernameValid(false);
      result = true;
    }

    if (email.length < 1) {
      console.log("no email!");
      setIsEmailEmpty(true);
      result = true;
    }

    if (!checkIsPasswordValid(password)) {
      console.log("invalid password");
      setIsPasswordValid(false);
      result = true;
    }

    if (password !== confirmPassword) {
      setPasswordsMismatch(true);
      result = true;
    }

    return result;
  };

  const checkIsHandleValid = (s: string) => {
    if (s.length < 1) return false;
    return !/[^a-zA-Z0-9]/.test(s);
  };

  const checkIsPasswordValid = (s: string) => {
    if (s.length < 8) return false;
    return (
      /[a-z]/.test(s) &&
      /[A-Z]/.test(s) &&
      /[0-9]/.test(s) &&
      /[-=+^$*.[\]{}()?"!@#%&/\\,><':;|_~`]/.test(s)
    );
  };

  return (
    <div className="register">
      <div className="register-title">Register</div>

      <form onSubmit={onSubmit}>
        <div className="register-input-field">
          <div className="register-input-label ">Handle:</div>
          <input
            value={username}
            onChange={(event) => {
              setIsUsernameEmpty(false);
              setIsUsernameTooLong(false);
              setIsUsernameValid(true);
              setUsernameExists(false);
              setUsername(event.target.value);
              setErrorOccurred(false);
            }}
            type="text"
            className={
              isUsernameEmpty ||
              !isUsernameValid ||
              usernameExists ||
              isUsernameTooLong
                ? "invalid"
                : ""
            }
          />

          {/* Username field empty */}
          {isUsernameEmpty ? (
            <div className="form-error-message">Handle field is empty</div>
          ) : (
            ""
          )}

          {/* Username too long */}
          {isUsernameTooLong ? (
            <div className="form-error-message">Handle is too long</div>
          ) : (
            ""
          )}

          {/* Invalid username */}
          {!isUsernameValid ? (
            <div className="form-error-message">
              Invalid handle (no special characters allowed)
            </div>
          ) : (
            ""
          )}

          {/* Username already exists */}
          {usernameExists ? (
            <div className="form-error-message">
              An account with this handle already exists
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="register-input-field">
          <div className="register-input-label">Email:</div>
          <input
            value={email}
            onChange={(event) => {
              setIsEmailEmpty(false);
              setEmailExists(false);
              setIsEmailValid(true);
              setEmail(event.target.value);
              setErrorOccurred(false);
            }}
            type="email"
            className={isEmailEmpty || emailExists ? "invalid" : ""}
          />

          {/* Email field empty */}
          {isEmailEmpty ? (
            <div className="form-error-message">Email field is empty</div>
          ) : (
            ""
          )}

          {/* Email already exists */}
          {emailExists ? (
            <div className="form-error-message">
              An account with this email already exists
            </div>
          ) : (
            ""
          )}

          {/* Invalid email */}
          {!isEmailValid ? (
            <div className="form-error-message">Invalid email</div>
          ) : (
            ""
          )}
        </div>

        <div className="register-input-field">
          <div className="register-input-label">Password:</div>
          <input
            value={password}
            onChange={(event) => {
              setPasswordsMismatch(false);
              setIsPasswordValid(true);
              setPassword(event.target.value);
              setErrorOccurred(false);
            }}
            type="password"
            className={!isPasswordValid || passwordsMismatch ? "invalid" : ""}
          />

          {/* Invalid password */}
          {!isPasswordValid ? (
            <div className="form-error-message">
              Password must be at least 8 characters long, and contain at least
              one uppercase, lowercase, number and special character.
            </div>
          ) : (
            ""
          )}

          <div className="register-input-field">
            <div className="register-input-label">Confirm Password:</div>
            <input
              value={confirmPassword}
              onChange={(event) => {
                setPasswordsMismatch(false);
                setConfirmPassword(event.target.value);
                setErrorOccurred(false);
              }}
              type="password"
              className={!isPasswordValid || passwordsMismatch ? "invalid" : ""}
            />
          </div>

          {/* Passwords don't match */}
          {passwordsMismatch && isPasswordValid ? (
            <div className="form-error-message">! Passwords do not match !</div>
          ) : (
            ""
          )}
        </div>

        <button type="submit">Submit</button>

        {/* Success message */}
        {hasSucceeded ? (
          <div
            style={{
              fontSize: "16px",
            }}
            className="form-success-message"
          >
            Success! Please verify your email before{" "}
            <Link
              style={{
                color: "#33c3f0",
              }}
              to="/login"
            >
              logging in
            </Link>
          </div>
        ) : (
          ""
        )}

        {/* Error message */}
        {errorOccurred ? (
          <div className="form-error-message">An error occurred.</div>
        ) : (
          ""
        )}

        <div id="register-login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
