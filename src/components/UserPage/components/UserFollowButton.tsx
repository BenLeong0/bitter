import React, { useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import EditProfileButton from "./EditProfileButton";
import { AccountContext } from "../../Account";

const UserFollowButton: React.FC<{
  handle: string;
  bio?: string;
  display_name?: string;
}> = ({ handle, bio, display_name }) => {
  const {
    myHandle,
    isFollowing,
  }: {
    myHandle: string;
    isFollowing: boolean;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  } = useContext(AccountContext);

  return (
    <div className="user-follow-button">
      {myHandle === handle ? (
        <EditProfileButton bio={bio} display_name={display_name} />
      ) : isFollowing ? (
        <UnfollowButton handle={handle} />
      ) : (
        <FollowButton handle={handle} />
      )}
    </div>
  );
};

export default UserFollowButton;
