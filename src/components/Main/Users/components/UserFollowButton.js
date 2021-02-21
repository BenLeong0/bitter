import { React, useState, useEffect } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

const UserFollowButton = (props) => {
  const [followingSuggested, setFollowingSuggested] = useState(false);

  const checkIfFollowing = async () => {
    const data = await fetch(
      `${props.backend_url}is-following/get?source_id=${props.myId}&destination_id=${props.user_id}`
    );
    const result = await data.json();
    setFollowingSuggested(result);
  };

  useEffect(() => {
    checkIfFollowing();
  }, []);

  useEffect(() => {
    if (props.user_id === props.currId) {
      setFollowingSuggested(props.isFollowing);
    }
  }, [props.isFollowing]);

  return (
    <div className={props.className}>
      {followingSuggested ? (
        <UnfollowButton
          {...props}
          setFollowingSuggested={setFollowingSuggested}
        />
      ) : (
        <FollowButton
          {...props}
          setFollowingSuggested={setFollowingSuggested}
        />
      )}
    </div>
  );
};

export default UserFollowButton;
