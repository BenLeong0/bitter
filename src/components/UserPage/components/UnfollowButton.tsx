import React, { useContext } from "react";
import { AccountContext } from "../../Account";

const UnfollowButton: React.FC<{ user_id: number }> = ({ user_id }) => {
  const {
    myId,
    setIsFollowing,
    deleteFollowEdge,
  }: {
    myId: number;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    deleteFollowEdge: (
      sourceId: number,
      destinationId: number
    ) => Promise<void>;
  } = useContext(AccountContext);

  const unfollow = async () => {
    setIsFollowing(false);
    // update db
    deleteFollowEdge(myId, user_id);

    // Authenticate user first + in request!

    // Pass through apikey, lambda to compare to cognito
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
