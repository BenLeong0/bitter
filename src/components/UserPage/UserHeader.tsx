import React from "react";
import "./UserHeader.css";

import UserBanner from "./components/UserBanner";
import UserPhoto from "./components/UserPhoto";
import UserFollowButton from "./components/UserFollowButton";
import UserInfo from "./components/UserInfo";

interface User {
  user_id: number;
  handle?: string;
  display_name?: string;
  created_on?: string;
  bio?: string;
  follower_count?: number;
  following_count?: number;
}

interface Props {
  updatePageState: (stateId: number) => void;
  user: User;
}

const UserHeader: React.FC<Props> = ({ updatePageState, user }) => {
  return (
    <div className="user-header">
      <UserBanner user_id={user.user_id} />
      <div className="user-pfp-follow">
        <UserPhoto user_id={user.user_id} />
        <UserFollowButton user_id={user.user_id} />
      </div>
      <UserInfo updatePageState={updatePageState} user={user} />
    </div>
  );
};

export default UserHeader;
