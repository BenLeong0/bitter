import React from "react";
import "./Settings.css";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import LogoutButton from "./LogoutButton";

// Confirmation popup styles
import "reactjs-popup/dist/index.css";

const Settings: React.FC<{}> = () => {
  document.title = "Settings / Bitter";

  return (
    <div className="settings">
      <div className="settings-title">Settings</div>
      <ChangeEmail />
      <ChangePassword />
      <DeleteAccount />
      <LogoutButton />
    </div>
  );
};

export default Settings;
