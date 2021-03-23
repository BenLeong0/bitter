import React from "react";

interface Props {}

const SelfUnfollowButton: React.FC<Props> = () => {
  return (
    <button
      className="button-primary"
      onClick={() => console.log("You can't unfollow yourself!")}
    >
      Following
    </button>
  );
};

export default SelfUnfollowButton;
