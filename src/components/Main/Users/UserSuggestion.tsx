import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Account";
import SuggestedUserFollowButton from "./components/SuggestedUserFollowButton";

interface User {
  handle: string;
  display_name?: string;
  isFollowing?: boolean;
}

const UserSuggestion: React.FC<User> = (user) => {
  return (
    <>
      <hr className="solid"></hr>
      <div className="user-suggestion">
        <Link to={"/u/" + user.handle}>
          <div className="user-suggestion-pfp">
            <img
              src={`${process.env.PUBLIC_URL}/placeholder48.png`}
              alt="profile pic"
            ></img>
          </div>
          <div className="user-suggestion-info">
            <div className="user-suggestion-displayname">
              {user.display_name}
            </div>
            <div className="user-suggestion-handle">@{user.handle}</div>
          </div>
        </Link>
        <SuggestedUserFollowButton
          className="user-suggestion-follow"
          handle={user.handle}
          isFollowing={user.isFollowing}
        />
      </div>
    </>
  );
};

export default UserSuggestion;
