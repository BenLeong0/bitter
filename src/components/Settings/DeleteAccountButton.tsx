import React, { useContext } from "react";
import { AccountContext } from "../Account";

export interface DeleteAccountButtonProps {}

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = () => {
  const onClick = (e: any) => {
    e.preventDefault();
    console.log("delete account");
    // Confirmation popup (password + type "delete-me")
  };

  return (
    <div id="delete-account-button">
      <button onClick={onClick} className="button-primary">
        Delete account
      </button>
    </div>
  );
};

export default DeleteAccountButton;
