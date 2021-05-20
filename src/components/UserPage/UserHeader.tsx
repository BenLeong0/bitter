import React, { useContext } from "react";
import "./UserHeader.css";

import UserBanner from "./components/UserBanner";
import UserPhoto from "./components/UserPhoto";
import UserInfo from "./components/UserInfo";

import User from "../../Types/User";
import ValidationService from "../core/ValidationService";
import { AccountContext } from "../Account";
import EditProfileButton from "./components/EditProfileButton";
import UnfollowButton from "../Shared/FollowButtons/UnfollowButton";
import FollowButton from "../Shared/FollowButtons/FollowButton";
import ContextProps from "../../Types/ContextProps";

interface Props {
  updatePageState: (stateId: number) => void;
  user: User;
}

const UserHeader: React.FC<Props> = ({ updatePageState, user }) => {
  const validationService = new ValidationService();
  const { setIsFollowing, isFollowing, myHandle }: ContextProps =
    useContext(AccountContext);

  return (
    <div className="user-header">
      <UserBanner handle={user.handle} />
      <div className="user-pfp-follow">
        <UserPhoto handle={user.handle} />
        <div className="user-branding">
          {validationService.isHater(user) ? (
            <span
              className="user-branding-hater"
              title="This user has more dislikes than likes"
            >
              HATER
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="user-follow-button">
          {myHandle === user.handle ? (
            <EditProfileButton
              bio={user.bio}
              display_name={user.display_name}
            />
          ) : isFollowing ? (
            <UnfollowButton
              handle={user.handle}
              setFollowing={setIsFollowing}
            />
          ) : (
            <FollowButton handle={user.handle} setFollowing={setIsFollowing} />
          )}
        </div>
      </div>
      <UserInfo updatePageState={updatePageState} user={user} />
    </div>
  );
};

export default UserHeader;
