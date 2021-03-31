import React from "react";
import "../components/Settings/Settings.css";
import ChangeEmail from "../components/Settings/ChangeEmail";
import ChangePassword from "../components/Settings/ChangePassword";
import DeleteAccount from "../components/Settings/DeleteAccount";
import LogoutButton from "../components/Settings/LogoutButton";

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
