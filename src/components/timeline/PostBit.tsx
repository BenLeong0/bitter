import React, { useContext } from "react";
import { AccountContext } from "../Account";
import PostBoxForm from "./PostBoxForm";
import "./Postbox.css";
import { Link } from "react-router-dom";

const PostBit: React.FC<{}> = () => {
  const { isLoggedIn }: { isLoggedIn: boolean } = useContext(AccountContext);

  return (
    <div className="postbox">
      {isLoggedIn ? (
        <>
          <div className="postbox-pfp">
            <img src="https://via.placeholder.com/48" alt="profile pic"></img>
          </div>
          <PostBoxForm />
        </>
      ) : (
        <div id="postbox-login">
          <Link to="/login">Login</Link> or <Link to="/register">register</Link>{" "}
          to post bits
        </div>
      )}
    </div>
  );
};

export default PostBit;
