import React, { useContext } from "react";
import { AccountContext } from "../../../Account";

type Props = {
  setIsFollowingSuggested: React.Dispatch<React.SetStateAction<boolean>>;
  user_id: string;
};

const FollowButton: React.FC<Props> = (props) => {
  const { setIsFollowingSuggested, user_id } = props;

  const {
    myId,
    currId,
    setIsFollowing,
    createFollowEdge,
    isLoggedIn,
  }: {
    myId: string;
    currId: string;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    createFollowEdge: (
      sourceId: string,
      destinationId: string
    ) => Promise<void>;
    isLoggedIn: boolean;
  } = useContext(AccountContext);

  const follow = async () => {
    if (isLoggedIn) {
      setIsFollowingSuggested(true);

      // Update userPage if same user
      if (user_id === currId) {
        setIsFollowing(true);
      }

      // update db
      createFollowEdge(myId, user_id);
    } else {
      console.log("not logged in!");
    }
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
