import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AccountContext } from "../Account";
import DeleteAccountConfirmation from "./DeleteAccountConfirmation";

export interface ChangeEmailProps {}

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");

  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [isConfirmationCorrect, setIsConfirmationCorrect] = useState<boolean>(
    true
  );

  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const {
    authenticate,
    getSession,
    logout,
    API_URL,
  }: {
    authenticate: (Username: string, Password: string) => Promise<undefined>;
    getSession: () => Promise<any>;
    logout: () => void;
    API_URL: string;
  } = useContext(AccountContext);

  const history = useHistory();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("delete account");

    // Check deleteConfirmation is correct
    if (deleteConfirmation !== "delete-me") {
      setIsConfirmationCorrect(false);
      return;
    }

    // Check password
    getSession()
      .then(async ({ user, headers, accessToken }) => {
        // Check login details
        authenticate(user.username, password)
          .then(async () => {
            // Setup request
            headers["Content-Type"] = "application/json";
            var requestOptions = {
              headers,
              method: "DELETE",
            };

            // Call API (delete from pool and database)
            await fetch(
              `${API_URL}/users?accessToken=${accessToken.jwtToken}`,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                const resultJSON = JSON.parse(result);

                // success/failure handling
                if (resultJSON.code === "deleteSuccess") {
                  // Redirect to /home
                  logout();
                  history.push(`/home`);
                } else {
                  // Error message
                  setErrorOccurred(true);
                  console.error(resultJSON);
                }
              })
              .catch((err) => {
                console.log("Error:", err);
                setErrorOccurred(true);
              });
          })
          .catch((err: any) => {
            const code = err.code;
            switch (code) {
              case "NotAuthorizedException":
                setIsPasswordCorrect(false);
                break;
              default:
                console.error(err);
            }
          });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="settings-field">
      <div className="settings-header">Delete account</div>
      <form onSubmit={(e) => e.preventDefault()}>
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
              className={!isPasswordCorrect ? "invalid" : ""}
            />

            {/* Incorrect password */}
            {!isPasswordCorrect ? (
              <div className="form-error-message">Incorrect password</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="delete-account-label">
          Type <code>delete-me</code> below to confirm your decision
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">Confirmation:</div>
          <div className="settings-input-wrapper">
            <input
              value={deleteConfirmation}
              onChange={(event) => {
                setIsConfirmationCorrect(true);
                setDeleteConfirmation(event.target.value);
              }}
              type="text"
              className={!isConfirmationCorrect ? "invalid" : ""}
            />

            {/* Incorrect confirmation text */}
            {!isConfirmationCorrect ? (
              <div className="form-error-message">
                Incorrect confirmation message
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <DeleteAccountConfirmation
          onSubmit={onSubmit}
          active={password.length > 0}
        />
      </form>
      <hr />
    </div>
  );
};

export default ChangeEmail;
