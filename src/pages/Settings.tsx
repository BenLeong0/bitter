import React from "react";
import "../components/Settings/Settings.css";
import ChangeEmail from "../components/Settings/ChangeEmail";
import ChangePassword from "../components/Settings/ChangePassword";
import LogoutButton from "../components/Settings/LogoutButton";
import DeleteAccountButton from "../components/Settings/DeleteAccountButton";

const Settings: React.FC<{}> = () => {
  document.title = "Settings / Bitter";

  return (
    <div className="settings">
      <div className="settings-title">Settings</div>
      <ChangeEmail />
      <ChangePassword />
      <LogoutButton />
      <DeleteAccountButton />
    </div>
  );
};

export default Settings;
