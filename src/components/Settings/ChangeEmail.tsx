import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useContext, useState } from "react";
import { AccountContext } from "../Account";

export interface ChangeEmailProps {}

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    authenticate,
    getSession,
  }: {
    authenticate: (Username: string, Password: string) => Promise<undefined>;
    getSession: () => Promise<any>;
  } = useContext(AccountContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("change email");

    // check valid email (done by type = "email" ?)
    getSession()
      .then(({ user }) => {
        authenticate(user.username, password)
          .then(() => {
            const attributes = [
              new CognitoUserAttribute({ Name: "email", Value: newEmail }),
            ];

            user.updateAttributes(
              attributes,
              (err: string, results: string) => {
                if (err) console.error(err);
                console.log(results);
              }
            );
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

    // check password
    // highlight input if incorrect + error message
    // send verification to new email
  };

  return (
    <div className="settings-field">
      <div className="settings-header">Change email</div>
      <form onSubmit={onSubmit}>
        <div className="settings-input-field">
          <div className="settings-input-label">New email:</div>
          <input
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            type="email"
          />
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">Password:</div>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <hr />
    </div>
  );
};

export default ChangeEmail;
