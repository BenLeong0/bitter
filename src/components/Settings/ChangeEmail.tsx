import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useContext, useState } from "react";
import { AccountContext } from "../Account";
import ChangeEmailConfirmation from "./ChangeEmailConfirmation";

export interface ChangeEmailProps {}

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);

  const {
    authenticate,
    getSession,
    isEmailUsed,
  }: {
    authenticate: (Username: string, Password: string) => Promise<undefined>;
    getSession: () => Promise<any>;
    isEmailUsed: (email: string) => Promise<boolean>;
  } = useContext(AccountContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if email is already used
    if (await isEmailUsed(newEmail)) {
      setEmailExists(true);
      return;
    }

    // check valid email (done by type = "email" ?)
    getSession()
      .then(({ user }) => {
        // Check password
        authenticate(user.username, password)
          .then(() => {
            const attributes = [
              new CognitoUserAttribute({ Name: "email", Value: newEmail }),
            ];

            user.updateAttributes(
              attributes,
              (err: string, results: string) => {
                if (err) {
                  console.error(err);
                } else {
                  setHasSucceeded(true);
                }
                console.log(results);
              }
            );
          })
          .catch((err) => {
            switch (err.code) {
              case "NotAuthorizedException":
                // Incorrect password
                setIsPasswordCorrect(false);
                break;
            }
          });
      })
      .catch((err) => console.error(err));

    // check password
    // highlight input if incorrect + error message
    // send verification to new email
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
          Success! Please check your email to verify the new address
        </div>
      ) : (
        ""
      )}
      <hr />
    </div>
  );
};

export default ChangeEmail;
