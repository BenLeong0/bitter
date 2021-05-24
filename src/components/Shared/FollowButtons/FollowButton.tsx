import React, { useContext } from "react";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";
import UserService from "../../core/UserService";

type Props = {
  setFollowing: (following: boolean) => void;
  handle: string;
};

const FollowButton: React.FC<Props> = ({ setFollowing, handle }) => {
  const userService = new UserService();
  const { currHandle, setIsFollowing, isLoggedIn }: ContextProps =
    useContext(AccountContext);

  const follow = async () => {
    if (!isLoggedIn) return console.log("Not logged in!");

    setFollowing(true);
    // Update userPage if same user
    if (handle === currHandle) {
      setIsFollowing(true);
    }

    // update db
    userService.createFollowEdge(handle);
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
