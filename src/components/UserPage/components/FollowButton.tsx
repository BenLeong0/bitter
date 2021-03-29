import React, { useContext } from "react";
import { AccountContext } from "../../Account";

const FollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    setIsFollowing,
    createFollowEdge,
    isLoggedIn,
  }: {
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    createFollowEdge: (destinationId: string) => Promise<void>;
    isLoggedIn: boolean;
  } = useContext(AccountContext);

  const follow = async () => {
    if (isLoggedIn) {
      setIsFollowing(true);
      // update db
      createFollowEdge(handle);

      // Authenticate user first + in request!

      // Pass through apikey, lambda to compare to cognito
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
