import React, { useContext } from "react";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";

const FollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    setIsFollowing,
    createFollowEdge,
    isLoggedIn,
  }: ContextProps = useContext(AccountContext);

  const follow = async () => {
    if (isLoggedIn) {
      setIsFollowing(true);

      // update db
      createFollowEdge(handle);
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
