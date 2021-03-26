import React, { useContext } from "react";
import { AccountContext } from "../Account";

export interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const { logout } = useContext(AccountContext);
  const onClick = (e: any) => {
    e.preventDefault();
    console.log("logout");
    // Confirmation popup !!!!

    logout();
  };

  return (
    <div id="logout-button">
      <button className="button-primary" onClick={onClick}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
