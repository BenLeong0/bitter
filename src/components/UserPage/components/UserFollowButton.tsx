import React, { useContext } from "react";
import FollowButton from "../../Shared/FollowButtons/FollowButton";
import UnfollowButton from "../../Shared/FollowButtons/UnfollowButton";
import EditProfileButton from "./EditProfileButton";
import { AccountContext } from "../../Account";
import ContextProps from "../../../Types/ContextProps";

const UserFollowButton: React.FC<{
  handle: string;
  bio?: string;
  display_name?: string;
  isHater: () => boolean;
}> = ({ handle, bio, display_name, isHater }) => {
  const { myHandle, isFollowing, setIsFollowing }: ContextProps =
    useContext(AccountContext);

  return (
    <div className="user-follow-button">
      {isHater() ? (
        <div
          className="user-branding user-branding-hater"
          title="This user has more dislikes than likes"
        >
          HATER
        </div>
      ) : (
        ""
      )}

      {myHandle === handle ? (
        <EditProfileButton bio={bio} display_name={display_name} />
      ) : isFollowing ? (
        <UnfollowButton handle={handle} setFollowing={setIsFollowing} />
      ) : (
        <FollowButton handle={handle} setFollowing={setIsFollowing} />
      )}
    </div>
  );
};

export default UserFollowButton;
