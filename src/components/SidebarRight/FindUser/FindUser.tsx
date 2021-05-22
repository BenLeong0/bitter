import React from "react";
import "./FindUser.css";
import FindUserForm from "./FindUserForm";

const FindUser: React.FC<{}> = () => {
  return (
    <div className="find-user">
      <div className="find-user-title">Go to user's page:</div>
      <FindUserForm />
    </div>
  );
};

export default FindUser;
