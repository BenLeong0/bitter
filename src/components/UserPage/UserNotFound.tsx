import React from "react";
import "./UserNotFound.css";

interface Props {
  handle: string;
}

const UserNotFound: React.FC<Props> = ({ handle }) => {
  // For if an invalid handle is loaded

  return (
    <div className="user-not-found">
      User <span className="user-not-found-handle">@{handle}</span> could not be
      found.
    </div>
  );
};

export default UserNotFound;
