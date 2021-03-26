import React, { useContext } from "react";
import { AccountContext } from "../../Account";
import { Link } from "react-router-dom";

const UserBox: React.FC<{}> = () => {
  const { myHandle } = useContext(AccountContext);
  return (
    <div className="options-userbox">
      Logged in as: <Link to={`/u/${myHandle}`}>@{myHandle}</Link>
    </div>
  );
};

export default UserBox;
