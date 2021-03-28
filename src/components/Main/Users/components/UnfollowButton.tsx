import React, { useContext } from "react";
import { AccountContext } from "../../../Account";

type Props = {
  setIsFollowingSuggested: React.Dispatch<React.SetStateAction<boolean>>;
  handle: string;
};

const UnfollowButton: React.FC<Props> = (props) => {
  const { setIsFollowingSuggested, handle } = props;

  const {
    myHandle,
    currHandle,
    setIsFollowing,
    deleteFollowEdge,
  }: {
    myHandle: string;
    currHandle: string;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    deleteFollowEdge: (
      sourceId: string,
      destinationId: string
    ) => Promise<void>;
  } = useContext(AccountContext);

  const unfollow = async () => {
    if (myHandle !== handle) {
      setIsFollowingSuggested(false);

      // Update userPage if same user
      if (handle === currHandle) {
        setIsFollowing(false);
      }

      // update db
      deleteFollowEdge(myHandle, handle);
    } else {
      console.log("can't unfollow yourself!");
    }
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
