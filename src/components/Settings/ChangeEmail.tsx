import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import CoreService from "../core/CoreService";
import ValidationService from "../core/ValidationService";
import ChangeEmailConfirmation from "./ChangeEmailConfirmation";

export interface ChangeEmailProps {}

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const validationService = new ValidationService();
  const coreService = new CoreService();

  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if email is already used
    if (await validationService.isEmailUsed(newEmail)) {
      setEmailExists(true);
      return;
    }

    let attributes = [
      new CognitoUserAttribute({ Name: "email", Value: newEmail }),
    ];

    let callback = (err: string, results: string) => {
      if (err) {
        console.error(err);
      } else {
        setHasSucceeded(true);
      }
      console.log(results);
    };

    let catchError = (err: any): void => {
      if (err.code === "NotAuthorizedException") setIsPasswordCorrect(false);
      console.error(err);
    };

    coreService
      .authenticate(password)
      .then((resp: any) => resp.user.updateAttributes(attributes, callback))
      .catch(catchError);
  };

  return (
    <div className="settings-field">
      <div className="settings-header">Change email</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="settings-input-field">
          <div className="settings-input-label">New email:</div>
          <div className="settings-input-wrapper">
            <input
              value={newEmail}
              onChange={(event) => {
                setEmailExists(false);
                setNewEmail(event.target.value);
              }}
              type="email"
              className={emailExists ? "invalid" : ""}
            />

            {/* Email already exists */}
            {emailExists ? (
              <div className="form-error-message">
                An account with this email already exists
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">Password:</div>
          <div className="settings-input-wrapper">
            <input
              value={password}
              onChange={(event) => {
                setIsPasswordCorrect(true);
                setPassword(event.target.value);
              }}
              type="password"
              className={isPasswordCorrect ? "" : "invalid"}
            />

            {/* Incorrect password */}
            {isPasswordCorrect ? (
              ""
            ) : (
              <div className="form-error-message">Incorrect password</div>
            )}
          </div>
        </div>

        <ChangeEmailConfirmation onSubmit={onSubmit} newEmail={newEmail} />
      </form>

      {/* Success message */}
      {hasSucceeded ? (
        <div className="form-success-message">
          Success! Please check your email to see a meaningless verification
          code
        </div>
      ) : (
        ""
      )}
      <hr />
    </div>
  );
};

export default ChangeEmail;
