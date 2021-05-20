import React, { useContext } from "react";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";
import InteractionsService from "../../core/InteractionsService";

const UnfollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const interactionsService = new InteractionsService();
  const { myHandle, setIsFollowing }: ContextProps = useContext(AccountContext);

  const unfollow = async () => {
    if (myHandle === handle) {
      console.log("Can't unfollow yourself!");
      return;
    }

    setIsFollowing(false);

    // update db
    interactionsService.deleteFollowEdge(handle);
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
