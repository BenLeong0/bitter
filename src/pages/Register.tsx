import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../components/Account";
import UserPool from "../UserPool";
import "./Register.css";

const Register: React.FC<{}> = () => {
  document.title = "Register / Bitter";

  const cognito = new CognitoIdentityServiceProvider({ region: "eu-west-2" });

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isUsernameEmpty, setIsUsernameEmpty] = useState<boolean>(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(false);

  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [passwordsMismatch, setPasswordsMismatch] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const { authenticate } = useContext(AccountContext);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log("register");

    // Check fields not empty and passwords match
    if (areFieldsValid()) {
      console.log("empty fields!");
      return;
    }

    // Check if email exists
    if (await isEmailUsed()) {
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
          }
        }
        console.log(data);
      }
    );
  };

  const areFieldsValid = () => {
    let result: boolean = false;

    if (username.length < 1) {
      console.log("no handle!");
      setIsUsernameEmpty(true);
      result = true;
    }

    if (email.length < 1) {
      console.log("no email!");
      setIsEmailEmpty(true);
      result = true;
    }

    if (checkPassword(password)) {
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

  const isEmailUsed = async () => {
    const data = await fetch(
      `https://wvv2lnqscf.execute-api.eu-west-2.amazonaws.com/dev/user-exists?email=${email}`
    );
    const result = await data.json();
    return result;
  };

  const checkPassword = (s: string) => {
    if (s.length < 8) return true;
    const passwordArray: Array<string> = s.split("");

    let requirements: Array<boolean> = [false, false, false, false];
    const lowercase: string = "abcdefghijklmnopqrstuvwxyz";
    const uppercase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers: string = "0123456789";
    const specials: string = "=+-^$*.[]{}()?\"!@#%&/\\,><':;|_~`";
    const checkSelf = (x: boolean): boolean => x;

    passwordArray.forEach((char) => {
      if (lowercase.includes(char)) {
        requirements[0] = true;
      } else if (uppercase.includes(char)) {
        requirements[1] = true;
      } else if (numbers.includes(char)) {
        requirements[2] = true;
      } else if (specials.includes(char)) {
        requirements[3] = true;
      }
    });

    return requirements.every(checkSelf);
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
              setUsernameExists(false);
              setUsername(event.target.value);
            }}
            type="text"
            className={isUsernameEmpty || usernameExists ? "invalid" : ""}
          />

          {/* Username field empty */}
          {isUsernameEmpty ? (
            <div className="register-error-message">Handle field is empty</div>
          ) : (
            ""
          )}

          {/* Username already exists */}
          {usernameExists ? (
            <div className="register-error-message">
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
            }}
            type="email"
            className={isEmailEmpty || emailExists ? "invalid" : ""}
          />

          {/* Email field empty */}
          {isEmailEmpty ? (
            <div className="register-error-message">Email field is empty</div>
          ) : (
            ""
          )}

          {/* Email already exists */}
          {emailExists ? (
            <div className="register-error-message">
              An account with this email already exists
            </div>
          ) : (
            ""
          )}

          {/* Invalid email */}
          {!isEmailValid ? (
            <div className="register-error-message">Invalid email</div>
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
            }}
            type="password"
            className={!isPasswordValid || passwordsMismatch ? "invalid" : ""}
          />

          {/* Invalid password */}
          {!isPasswordValid ? (
            <div className="register-error-message">
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
              }}
              type="password"
              className={!isPasswordValid || passwordsMismatch ? "invalid" : ""}
            />
          </div>

          {/* Passwords don't match */}
          {passwordsMismatch && isPasswordValid ? (
            <div className="register-error-message">
              ! Passwords do not match !
            </div>
          ) : (
            ""
          )}
        </div>

        <button type="submit">Submit</button>
        <div id="register-login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
