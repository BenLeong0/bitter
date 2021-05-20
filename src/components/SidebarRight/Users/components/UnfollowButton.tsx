import React, { useContext } from "react";
import ContextProps from "../../../../Types/ContextProps";
import { AccountContext } from "../../../Account";
import InteractionsService from "../../../core/InteractionsService";

type Props = {
  setIsFollowingSuggested: React.Dispatch<React.SetStateAction<boolean>>;
  handle: string;
};

const UnfollowButton: React.FC<Props> = (props) => {
  const interactionsService = new InteractionsService();
  const { setIsFollowingSuggested, handle } = props;

  const { myHandle, currHandle, setIsFollowing }: ContextProps =
    useContext(AccountContext);

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
    interactionsService.deleteFollowEdge(handle);
  };

  return (
    <button className="button-primary" onClick={unfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
