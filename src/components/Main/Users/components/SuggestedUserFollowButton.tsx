import React, { useState, useEffect, useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { AccountContext } from "../../../Account";

interface Props {
  className: string;
  user_id: number;
}

const SuggestedUserFollowButton: React.FC<Props> = ({ className, user_id }) => {
  const [isFollowingSuggested, setIsFollowingSuggested] = useState<boolean>(
    false
  );

  const {
    checkIfFollowing,
    currId,
    myId,
    isFollowing,
  }: {
    checkIfFollowing: (
      sourceId: number,
      destinationId: number
    ) => Promise<boolean>;
    currId: number;
    myId: number;
    isFollowing: boolean;
  } = useContext(AccountContext);

  // Check if following on mount
  useEffect(() => {
    checkIfFollowing(myId, user_id).then((resp) =>
      setIsFollowingSuggested(resp)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Link to main user if same
  useEffect(() => {
    if (user_id === currId) {
      setIsFollowingSuggested(isFollowing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowing]);

  return (
    <div className={className}>
      {isFollowingSuggested ? (
        <UnfollowButton
          user_id={user_id}
          setIsFollowingSuggested={setIsFollowingSuggested}
        />
      ) : (
        <FollowButton
          user_id={user_id}
          setIsFollowingSuggested={setIsFollowingSuggested}
        />
      )}
    </div>
  );
};

export default SuggestedUserFollowButton;
