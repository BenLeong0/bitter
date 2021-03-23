import React, { useEffect, useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import SelfUnfollowButton from "./SelfUnfollowButton";
import { AccountContext } from "../../Account";

interface Props {
  user_id: number;
}

const UserFollowButton: React.FC<Props> = ({ user_id }) => {
  const {
    myId,
    isFollowing,
    checkIfFollowing,
    setIsFollowing,
  }: {
    myId: number;
    isFollowing: boolean;
    checkIfFollowing: (
      sourceId: number,
      destinationId: number
    ) => Promise<boolean>;
    setIsFollowing: (status: boolean) => void;
  } = useContext(AccountContext);

  // Change follow button when loading page
  useEffect(() => {
    if (!checkIfFollowing || !setIsFollowing) {
      return;
    }
    async function check() {
      let response = await checkIfFollowing(myId, user_id);
      setIsFollowing(response);
    }
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  // SelfUnfollowButton: Users cannot unfollow themselves
  // Shows button to unfollow if currently following
  // Else shows button to follow
  return (
    <div className="user-follow-button">
      {user_id === myId ? (
        <SelfUnfollowButton />
      ) : isFollowing ? (
        <UnfollowButton user_id={user_id} />
      ) : (
        <FollowButton user_id={user_id} />
      )}
    </div>
  );
};

export default UserFollowButton;
