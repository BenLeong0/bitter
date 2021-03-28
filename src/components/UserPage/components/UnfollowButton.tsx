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
    deleteFollowEdge: (
      sourceId: string,
      destinationId: string
    ) => Promise<void>;
  } = useContext(AccountContext);

  const unfollow = async () => {
    setIsFollowing(false);
    // update db
    deleteFollowEdge(myHandle, handle);

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
