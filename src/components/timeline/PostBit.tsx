import React from "react";
import PostBoxForm from "./PostBoxForm";
import "./Postbox.css";

const PostBit = () => {
  return (
    <div className="postbox">
      <div className="postbox-pfp">
        <img src="https://via.placeholder.com/48" alt="profile pic"></img>
      </div>
      <PostBoxForm />
    </div>
  );
};

export default PostBit;
