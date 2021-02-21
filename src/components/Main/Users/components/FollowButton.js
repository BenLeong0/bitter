import React from "react";

const FollowButton = (props) => {
  const follow = async () => {
    if (!props.hasOwnProperty("user_id")) {
      console.error("props not loaded yet");
      return;
    }

    props.setFollowingSuggested(true);
    if (props.user_id === props.currId) {
      props.setIsFollowing(true);
    }

    // update db
    fetch(
      `${props.backend_url}create-follow/post?source_id=${props.myId}&destination_id=${props.user_id}`,
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
