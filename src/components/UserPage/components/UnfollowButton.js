import React from "react";

const UnfollowButton = (props) => {
  const unfollow = async () => {
    if (!props.hasOwnProperty("user_id")) {
      console.error("props not loaded yet");
      return;
    }
    props.setIsFollowing(false);
    console.log(props.user_id, props.myId);
    // update db
    fetch(
      `${props.backend_url}delete-follow/post?source_id=${props.myId}&destination_id=${props.user_id}`,
      { method: "POST" }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error("error", error));
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
