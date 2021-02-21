import React from "react";
import "./UserNotFound.css";

const UserNotFound = (props) => {
  // For if an invalid handle is loaded

  return (
    <div className="user-not-found">
      User{" "}
      <span className="user-not-found-handle">
        @{props.match.params.handle}
      </span>{" "}
      could not be found.
    </div>
  );
};

export default UserNotFound;
