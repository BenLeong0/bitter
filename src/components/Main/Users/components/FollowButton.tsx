import React, { useContext } from "react";
import { AccountContext } from "../../../Account";

type Props = {
  setIsFollowingSuggested: React.Dispatch<React.SetStateAction<boolean>>;
  handle: string;
};

const FollowButton: React.FC<Props> = (props) => {
  const { setIsFollowingSuggested, handle } = props;

  const {
    currHandle,
    setIsFollowing,
    createFollowEdge,
    isLoggedIn,
  }: {
    currHandle: string;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    createFollowEdge: (destinationHandle: string) => Promise<void>;
    isLoggedIn: boolean;
  } = useContext(AccountContext);

  const follow = async () => {
    if (isLoggedIn) {
      setIsFollowingSuggested(true);

      // Update userPage if same user
      if (handle === currHandle) {
        setIsFollowing(true);
      }

      // update db
      createFollowEdge(handle);
    } else {
      console.log("Not logged in!");
    }
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;