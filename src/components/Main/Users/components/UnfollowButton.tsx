import React, { useContext } from "react";
import ContextProps from "../../../../Types/ContextProps";
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
  }: ContextProps = useContext(AccountContext);

  const unfollow = async () => {
    if (myHandle === handle) {
      console.log("Can't unfollow yourself!");
      return;
    }

    setIsFollowingSuggested(false);

    // Update userPage if same user
    if (handle === currHandle) {
      setIsFollowing(false);
    }

    // update db
    deleteFollowEdge(handle);
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
