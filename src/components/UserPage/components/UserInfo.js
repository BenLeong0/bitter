import { React, useEffect } from "react";

const UserInfo = (props) => {
  const printProps = () => {
    console.log(props);
  };

  return (
    <div className="user-info">
      <div className="user-displayname" onClick={printProps}>
        {props.display_name}
      </div>
      <div className="user-handle">{props.handle}</div>
      <div className="user-bio">{props.bio}</div>
      <div className="user-tabs">
        <div className="user-tab-bits user-current-tab">
          <b>5</b> Bits
        </div>
        <div className="user-tab-replies ">
          <b>7</b> Bits and replies
        </div>
        <div className="user-following">
          <b>{props.following_count}</b> Following
        </div>
        <div className="user-followers">
          <b>{props.follower_count}</b> Followers
        </div>
        <div className="user-likes">
          <b>5</b> Likes
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
