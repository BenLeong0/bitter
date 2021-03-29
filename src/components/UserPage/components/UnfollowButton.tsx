import React, { useContext } from "react";
import { AccountContext } from "../../Account";

const UnfollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    myHandle,
    setIsFollowing,
    deleteFollowEdge,
  }: {
    myHandle: string;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    deleteFollowEdge: (destinationHandle: string) => Promise<void>;
  } = useContext(AccountContext);

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
