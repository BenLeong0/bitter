import React, { useContext } from "react";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";
import UserService from "../../core/UserService";

type Props = {
  setFollowing: (following: boolean) => void;
  handle: string;
};

const UnfollowButton: React.FC<Props> = ({ setFollowing, handle }) => {
  const userService = new UserService();
  const { myHandle, currHandle, setIsFollowing, isLoggedIn }: ContextProps =
    useContext(AccountContext);

  const unfollow = async () => {
    if (myHandle === handle) {
      console.log("Can't unfollow yourself!");
      return;
    }

    if (!isLoggedIn) return console.log("Not logged in!");

    setFollowing(false);
    // Update userPage if same user
    if (handle === currHandle) {
      setIsFollowing(false);
    }

    // update db
    userService.deleteFollowEdge(handle);
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
