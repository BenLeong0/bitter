import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Account";
import PostBoxForm from "./PostBoxForm";
import "./Postbox.css";
import { Link } from "react-router-dom";
import ContextProps from "../../Types/ContextProps";

const PostBit: React.FC<{}> = () => {
  const { isLoggedIn, myHandle }: ContextProps = useContext(AccountContext);

  // Profile pic src
  const [src, setSrc] = useState<string>("");
  const onError = () => {
    setSrc(`https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfpdefault`);
  };

  useEffect(() => {
    setSrc(
      `https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfp-${myHandle}` +
        `?${Date.now().toString().slice(0, -4)}`
    );
  }, [myHandle]);

  return (
    <div className="postbox">
      {isLoggedIn ? (
        <>
          <div className="postbox-pfp">
            <img src={src} onError={onError} alt="pfp" />
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
