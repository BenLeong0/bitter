import React from "react";
import "./UserHeader.css";

import UserBanner from "./components/UserBanner";
import UserPhoto from "./components/UserPhoto";
import UserFollowButton from "./components/UserFollowButton";

const UserHeader = (props) => {
  return (
    <div className="user-header">
      <UserBanner {...props} />
      <div className="user-pfp-follow">
        <UserPhoto />
        <UserFollowButton {...props} className="user-follow-button" />
      </div>
      yo {props.handle}
    </div>
  );
};

export default UserHeader;
