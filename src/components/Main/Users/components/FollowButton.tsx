import React, { useContext } from "react";
import { AccountContext } from "../../../Account";

type Props = {
  setIsFollowingSuggested: React.Dispatch<React.SetStateAction<boolean>>;
  user_id: number;
};

const FollowButton: React.FC<Props> = (props) => {
  const { setIsFollowingSuggested, user_id } = props;

  const {
    myId,
    currId,
    setIsFollowing,
    createFollowEdge,
  }: {
    myId: number;
    currId: number;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    createFollowEdge: (
      sourceId: number,
      destinationId: number
    ) => Promise<void>;
  } = useContext(AccountContext);

  const follow = async () => {
    setIsFollowingSuggested(true);

    // Update userPage if same user
    if (user_id === currId) {
      setIsFollowing(true);
    }

    // update db
    createFollowEdge(myId, user_id);
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
