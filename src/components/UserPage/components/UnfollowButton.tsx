import React, { useContext } from "react";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";

const UnfollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    myHandle,
    setIsFollowing,
    deleteFollowEdge,
  }: ContextProps = useContext(AccountContext);

  const unfollow = async () => {
    if (myHandle === handle) {
      console.log("Can't unfollow yourself!");
      return;
    }

    setIsFollowing(false);

    // update db
    deleteFollowEdge(handle);
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
