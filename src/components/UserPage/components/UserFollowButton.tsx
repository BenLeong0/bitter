import React, { useEffect, useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import SelfUnfollowButton from "./SelfUnfollowButton";
import { AccountContext } from "../../Account";

const UserFollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    myHandle,
    isFollowing,
    setIsFollowing,
  }: {
    myHandle: string;
    isFollowing: boolean;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  } = useContext(AccountContext);

  return (
    <div className="user-follow-button">
      {myHandle === handle ? (
        <SelfUnfollowButton />
      ) : isFollowing ? (
        <UnfollowButton handle={handle} />
      ) : (
        <FollowButton handle={handle} />
      )}
    </div>
  );
};

export default UserFollowButton;
