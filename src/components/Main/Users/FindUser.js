import React from "react";
import "./findusers.css";
import FindUserForm from "./FindUserForm";

const FindUser = () => {
  return (
    <div className="find-user">
      <div className="find-user-title">Go to user's page:</div>
      <FindUserForm />
    </div>
  );
};

export default FindUser;
