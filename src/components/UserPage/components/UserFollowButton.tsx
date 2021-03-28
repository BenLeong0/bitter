import React, { useEffect, useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import SelfUnfollowButton from "./SelfUnfollowButton";
import { AccountContext } from "../../Account";

const UserFollowButton: React.FC<{ handle: string }> = ({ handle }) => {
  const {
    myHandle,
    isFollowing,
    checkIfFollowing,
    setIsFollowing,
  }: {
    myHandle: string;
    isFollowing: boolean;
    checkIfFollowing: (
      sourceId: string,
      destinationId: string
    ) => Promise<boolean>;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  } = useContext(AccountContext);

  // Change follow button when loading page
  // useEffect(() => {
  //   if (!checkIfFollowing || !setIsFollowing) {
  //     return;
  //   }
  //   async function check() {
  //     let response = await checkIfFollowing(myId, user_id);
  //     setIsFollowing(response);
  //   }
  //   check();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user_id]);

  // SelfUnfollowButton: Users cannot unfollow themselves
  // Shows button to unfollow if currently following
  // Else shows button to follow
  return (
    <div className="user-follow-button">
      {myHandle === handle ? (
        <SelfUnfollowButton />
      ) : isFollowing ? (
        <UnfollowButton handle={handle} />
      ) : (
        <FollowButton handle={handle} />
      )}
    </div>
  );
};

export default UserFollowButton;
