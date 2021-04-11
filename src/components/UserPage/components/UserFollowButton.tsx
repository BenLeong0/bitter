import React, { useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import EditProfileButton from "./EditProfileButton";
import { AccountContext } from "../../Account";
import ContextProps from "../../../Types/ContextProps";

const UserFollowButton: React.FC<{
  handle: string;
  bio?: string;
  display_name?: string;
  isHater: () => boolean;
}> = ({ handle, bio, display_name, isHater }) => {
  const { myHandle, isFollowing }: ContextProps = useContext(AccountContext);

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
        <UnfollowButton handle={handle} />
      ) : (
        <FollowButton handle={handle} />
      )}
    </div>
  );
};

export default UserFollowButton;
