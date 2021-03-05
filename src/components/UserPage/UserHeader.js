import React from "react";
import "./UserHeader.css";

import UserBanner from "./components/UserBanner";
import UserPhoto from "./components/UserPhoto";
import UserFollowButton from "./components/UserFollowButton";
import UserInfo from "./components/UserInfo";

const UserHeader = (props) => {
  return (
    <div className="user-header">
      <UserBanner {...props} />
      <div className="user-pfp-follow">
        <UserPhoto />
        <UserFollowButton {...props} className="user-follow-button" />
      </div>
      <UserInfo {...props} />
    </div>
  );
};

export default UserHeader;
