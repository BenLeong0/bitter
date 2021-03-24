import React from "react";

// EDIT PROFILE

const SelfUnfollowButton: React.FC<{}> = () => {
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
