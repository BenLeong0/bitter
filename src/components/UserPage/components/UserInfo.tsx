import React from "react";

interface User {
  user_id: number;
  handle?: string;
  display_name?: string;
  created_on?: string;
  bio?: string;
  follower_count?: number;
  following_count?: number;
}

interface Props {
  updatePageState: (stateId: number) => void;
  user: User;
}

const UserInfo: React.FC<Props> = ({ updatePageState, user }) => {
  const printProps = () => {
    console.log("yo", user);
  };

  return (
    <div className="user-info">
      <div className="user-displayname" onClick={printProps}>
        {user.display_name}
      </div>
      <div className="user-handle">{user.handle}</div>
      <div className="user-bio">{user.bio}</div>
      <div className="user-tabs">
        <div className="user-tab-bits user-current-tab">
          <b>5</b> Bits
        </div>
        <div className="user-tab-replies ">
          <b>7</b> Bits and replies
        </div>
        <div className="user-following">
          <b>{user.following_count}</b> Following
        </div>
        <div className="user-followers">
          <b>{user.follower_count}</b> Followers
        </div>
        <div className="user-likes">
          <b>5</b> Likes
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
