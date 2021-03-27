import React, { useContext } from "react";
import { AccountContext } from "../../Account";

const FollowButton: React.FC<{ user_id: string }> = ({ user_id }) => {
  const {
    myId,
    setIsFollowing,
    createFollowEdge,
    isLoggedIn,
  }: {
    myId: string;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    createFollowEdge: (
      sourceId: string,
      destinationId: string
    ) => Promise<void>;
    isLoggedIn: boolean;
  } = useContext(AccountContext);

  const follow = async () => {
    if (isLoggedIn) {
      setIsFollowing(true);
      // update db
      createFollowEdge(myId, user_id);

      // Authenticate user first + in request!

      // Pass through apikey, lambda to compare to cognito
    } else {
      console.log("not logged in");
    }
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
