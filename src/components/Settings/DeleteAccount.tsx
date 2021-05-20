import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import ContextProps from "../../Types/ContextProps";
import { AccountContext } from "../Account";
import HttpService from "../core/HttpService";
import CoreService from "../core/CoreService";
import DeleteAccountConfirmation from "./DeleteAccountConfirmation";

export interface ChangeEmailProps {}

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const httpService = new HttpService();
  const coreService = new CoreService();

  const [password, setPassword] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");

  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [isConfirmationCorrect, setIsConfirmationCorrect] =
    useState<boolean>(true);

  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { logout, myHandle }: ContextProps = useContext(AccountContext);

  const history = useHistory();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Check deleteConfirmation is correct
    if (deleteConfirmation !== `delete-me-${myHandle}`) {
      setIsConfirmationCorrect(false);
      setIsLoading(false);
      return;
    }

    const catchError = (err: any) => {
      if (err.code === "NotAuthorizedException") setIsPasswordCorrect(false);
      console.error(err);
    };

    // Check password
    await coreService
      .authenticate(password)
      .then(async () => {
        let session = await coreService.getSession();
        let { accessToken } = session;

        let res = "/users";
        let body = { accessToken: accessToken.jwtToken };
        let resp = await httpService.makeDeleteRequest(res, body);

        if (resp.code === "deleteSuccess") {
          logout();
          history.push(`/home`);
          console.log(resp);
        } else {
          setErrorOccurred(true);
          console.error(resp);
        }
      })
      .catch(catchError)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="settings-field">
      {isLoading ? (
        <div className="loader" />
      ) : (
        <>
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
                    setErrorOccurred(false);
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
              Type <code>delete-me-{myHandle}</code> below to confirm your
              decision
            </div>

            <div className="settings-input-field">
              <div className="settings-input-label">Confirmation:</div>
              <div className="settings-input-wrapper">
                <input
                  value={deleteConfirmation}
                  onChange={(event) => {
                    setIsConfirmationCorrect(true);
                    setDeleteConfirmation(event.target.value);
                    setErrorOccurred(false);
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

            {/* Error message */}
            {errorOccurred ? (
              <div className="form-error-message">An error occurred.</div>
            ) : (
              ""
            )}
          </form>
        </>
      )}

      <hr />
    </div>
  );
};

export default ChangeEmail;
