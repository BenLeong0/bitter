import React, { useContext } from "react";
import { AccountContext } from "../../../Account";

type Props = {
  setIsFollowingSuggested: React.Dispatch<React.SetStateAction<boolean>>;
  user_id: number;
};

const UnfollowButton: React.FC<Props> = (props) => {
  const { setIsFollowingSuggested, user_id } = props;
  const { myId, currId, setIsFollowing, deleteFollowEdge } = useContext(
    AccountContext
  );

  const unfollow = async () => {
    setIsFollowingSuggested(false);

    // Update userPage if same user
    if (user_id === currId) {
      setIsFollowing(false);
    }

    // update db
    deleteFollowEdge(myId, user_id);
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
