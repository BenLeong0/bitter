import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuggestedUserFollowButton from "./components/SuggestedUserFollowButton";

interface User {
  handle: string;
  display_name?: string;
  isFollowing?: boolean;
}

const UserSuggestion: React.FC<User> = (user) => {
  // Profile pic src
  const [src, setSrc] = useState<string>("");
  const onError = () => {
    setSrc(`https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfpdefault`);
  };
  useEffect(() => {
    setSrc(
      "https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfp-" +
        user.handle +
        `?${Date.now().toString().slice(0, -4)}`
    );
  }, [user.handle]);

  return (
    <>
      <hr className="solid" />
      <div className="user-suggestion">
        <Link to={"/u/" + user.handle}>
          <div className="user-suggestion-pfp">
            <img src={src} onError={onError} alt="profile pic" />
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
