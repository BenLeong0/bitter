import React from "react";
import User from "../../../Types/User";

export interface UserFollowUserProps {
  user: User;
}

const UserFollowUser: React.FC<UserFollowUserProps> = ({ user }) => {
  return <>{user.handle}</>;
};

export default UserFollowUser;
