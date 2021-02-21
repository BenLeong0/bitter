import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

const UserFollowButton = (props) => {
  const checkIfFollowing = async () => {
    const data = await fetch(
      `${props.API_URL}is-following/get?source_id=${props.myId}&destination_id=${props.currId}`
    );
    const result = await data.json();
    props.setIsFollowing(result);
  };

  useEffect(() => {
    if (props.currId === 0 || !props.hasOwnProperty("currId")) {
      return;
    }
    console.log(props.currId);
    checkIfFollowing();
  }, [props.currId]);

  return (
    <div className={props.className}>
      {props.isFollowing ? (
        <UnfollowButton setIsFollowing={props.setIsFollowing} {...props} />
      ) : (
        <FollowButton setIsFollowing={props.setIsFollowing} {...props} />
      )}
    </div>
  );
};

export default UserFollowButton;
