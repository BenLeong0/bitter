import React, { useContext } from "react";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";
import InteractionsService from "../../core/InteractionsService";

const FollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const interactionsService = new InteractionsService();
  const { setIsFollowing, isLoggedIn }: ContextProps =
    useContext(AccountContext);

  const follow = async () => {
    if (isLoggedIn) {
      setIsFollowing(true);

      // update db
      interactionsService.createFollowEdge(handle);
    } else {
      console.log("Not logged in");
    }
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
