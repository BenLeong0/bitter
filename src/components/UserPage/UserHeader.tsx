import React from "react";
import "./UserHeader.css";

import UserBanner from "./components/UserBanner";
import UserPhoto from "./components/UserPhoto";
import UserFollowButton from "./components/UserFollowButton";
import UserInfo from "./components/UserInfo";

import User from "../../Types/User";
// interface User {
//   handle: string;
//   handle?: string;
//   display_name?: string;
//   created_on?: string;
//   bio?: string;
//   follower_count?: number;
//   following_count?: number;
// }

interface Props {
  updatePageState: (stateId: number) => void;
  user: User;
}

const UserHeader: React.FC<Props> = ({ updatePageState, user }) => {
  const isHater = (): boolean => {
    if (!user.dislikes || !user.likes) return false;
    if (user.dislikes > user.likes) return true;
    else return false;
  };

  return (
    <div className="user-header">
      <UserBanner handle={user.handle} />
      <div className="user-pfp-follow">
        <UserPhoto handle={user.handle} />
        <UserFollowButton
          handle={user.handle}
          bio={user.bio}
          display_name={user.display_name}
          isHater={isHater}
        />
      </div>
      <UserInfo updatePageState={updatePageState} user={user} />
    </div>
  );
};

export default UserHeader;