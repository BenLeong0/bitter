import React, { useContext } from "react";
import { Link } from "react-router-dom";

import User from "../../../Types/User";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";
import SuggestedUserFollowButton from "../../Main/Users/components/SuggestedUserFollowButton";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  // myHandle to show/hide follow button
  const { myHandle }: ContextProps = useContext(AccountContext);

  // Numbers for interactions
  return (
    <div className="user-card">
      {/* Poster profile picture */}
      <Link to={`/u/${user.handle}`}>
        <div className="bit-pfp">
          <img
            src={`${process.env.PUBLIC_URL}/placeholder48.png`}
            alt="profile pic"
          />
        </div>
      </Link>

      <div className="user-card-content">
        {/* Poster info */}
        <Link to={`/u/${user.handle}`}>
          <div className="user-card-info">
            <span className="bit-info-displayname">{user.display_name}</span>
            <span className="bit-info-handle">@{user.handle}</span>
          </div>
        </Link>

        {/* Follow button */}
        <div
          className="user-card-follow"
          style={{ display: myHandle === user.handle ? "none" : "" }}
        >
          <SuggestedUserFollowButton
            className="user-card-follow-button"
            handle={user.handle}
            isFollowing={user.isFollowing}
          />
        </div>

        <Link to={`/u/${user.handle}`}>
          <div className="user-card-bio">{user.bio}</div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
