import React, { useState } from "react";

export interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("change password");
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
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">New password:</div>
          <input
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            type="password"
          />
        </div>

        <div className="settings-input-field">
          <div className="settings-input-label">Confirm password:</div>
          <input
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            type="password"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <hr />
    </div>
  );
};

export default ChangePassword;
