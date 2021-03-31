import React, { useContext, useState } from "react";
import { AccountContext } from "../Account";
import ChangePasswordConfirmation from "./ChangePasswordConfirmation";

export interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(true);
  const [passwordsMismatch, setPasswordsMismatch] = useState<boolean>(false);
  const [correctOldPassword, setCorrectOldPassword] = useState<boolean>(true);

  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);

  const { getSession, authenticate } = useContext(AccountContext);

  const checkIsPasswordValid = (s: string) => {
    if (s.length < 8) return false;
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check new password is valid
    if (!checkIsPasswordValid(newPassword)) {
      console.log("invalid password");
      setIsNewPasswordValid(false);
      setHasSucceeded(false);
      return;
    }

    // Check password match
    if (newPassword !== confirmNewPassword) {
      setPasswordsMismatch(true);
      setHasSucceeded(false);
      return;
    }

    // Authenticate and change
    getSession()
      .then(({ user }: { user: any }) => {
        // Check login details
        authenticate(user.username, password)
          .then(() => {
            //Change password
            user.changePassword(
              password,
              newPassword,
              (err: any, result: any) => {
                if (err) console.error(err);
                if (result === "SUCCESS") {
                  setHasSucceeded(true);
                }
              }
            );
          })
          .catch((err: any) => {
            const code = err.code;
            switch (code) {
              case "NotAuthorizedException":
                setCorrectOldPassword(false);
                break;
              default:
                console.error(err);
            }
            setHasSucceeded(false);
          });
      })
      .catch((err: any) => {
        console.error(err);
      });
    // check password
    // highlight input if incorrect + error message
    // send verification to new email
  };

  return (
    <div className="settings-field">
      <div className="settings-header">Current password:</div>
      <form onSubmit={onSubmit}>
        <div className="settings-input-field">
          <div className="settings-input-label">Password:</div>
          <div className="settings-input-wrapper">
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setCorrectOldPassword(true);
              }}
              type="password"
              className={!correctOldPassword ? "invalid" : ""}
            />

            {/* Incorrect (old) password */}
            {!correctOldPassword ? (
              <div className="form-error-message">Incorrect password</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">New password:</div>
          <div className="settings-input-wrapper">
            <input
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setPasswordsMismatch(false);
                setIsNewPasswordValid(true);
              }}
              type="password"
              className={
                !isNewPasswordValid || passwordsMismatch ? "invalid" : ""
              }
            />

            {/* Invalid password */}
            {!isNewPasswordValid ? (
              <div className="form-error-message">Invalid password</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">Confirm password:</div>
          <div className="settings-input-wrapper">
            <input
              value={confirmNewPassword}
              onChange={(event) => {
                setConfirmNewPassword(event.target.value);
                setPasswordsMismatch(false);
              }}
              type="password"
              className={passwordsMismatch ? "invalid" : ""}
            />

            {/* Passwords don't match */}
            {passwordsMismatch ? (
              <div className="form-error-message">
                ! Passwords do not match !
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <ChangePasswordConfirmation onSubmit={onSubmit} />

        {/* Success message */}
        <div
          style={{
            fontSize: "16px",
            display: hasSucceeded ? "" : "none",
          }}
          className="form-success-message"
        >
          Password has been successfully changed
        </div>
      </form>
      <hr />
    </div>
  );
};

export default ChangePassword;
