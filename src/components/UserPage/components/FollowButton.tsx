import React, { useContext } from "react";
import { AccountContext } from "../../Account";

interface Props {
  user_id: number;
}

const FollowButton: React.FC<Props> = ({ user_id }) => {
  const {
    myId,
    setIsFollowing,
    createFollowEdge,
  }: {
    myId: number;
    setIsFollowing: (isFollowing: boolean) => void;
    createFollowEdge: (
      sourceId: number,
      destinationId: number
    ) => Promise<void>;
  } = useContext(AccountContext);

  const follow = async () => {
    setIsFollowing(true);
    // update db
    createFollowEdge(myId, user_id);
    // Authenticate user first + in request!
    // Pass through apikey, lambda to compare to cognito
  };

  return (
    <button className="button" onClick={follow}>
      Follow
    </button>
  );
};

export default FollowButton;
