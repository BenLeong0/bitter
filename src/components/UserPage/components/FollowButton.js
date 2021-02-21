import React from "react";

const FollowButton = (props) => {
  const follow = async () => {
    if (!props.hasOwnProperty("user_id")) {
      console.error("props not loaded yet");
      return;
    }
    props.setIsFollowing(true);
    console.log(props.user_id, props.myId);
    // update db
    fetch(
      `${props.API_URL}create-follow/post?source_id=${props.myId}&destination_id=${props.user_id}`,
      { method: "POST" }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error("error", error));
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
