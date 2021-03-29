import React, { useContext } from "react";
import { AccountContext } from "../../Account";

const FollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    setIsFollowing,
    createFollowEdge,
    isLoggedIn,
  }: {
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    createFollowEdge: (destinationHandle: string) => Promise<void>;
    isLoggedIn: boolean;
  } = useContext(AccountContext);

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
