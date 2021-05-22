import React from "react";

import User from "../../Types/User";
import UserCard from "./UserFollowList/UserCard";

export interface UserFollowListProps {
  users: Array<User>;
  isLoading: boolean;
}

const UserFollowList: React.FC<UserFollowListProps> = ({
  users,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="userlist-loader">
          <div className="loader" />
        </div>
      ) : users.length > 0 ? (
        users.map((user) => <UserCard user={user} key={user.handle} />)
      ) : (
        <div className="no-users">No users found</div>
      )}
    </>
  );
};

export default UserFollowList;
