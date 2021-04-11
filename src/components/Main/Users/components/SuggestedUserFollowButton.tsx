import React, { useState, useEffect, useContext } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { AccountContext } from "../../../Account";
import ContextProps from "../../../../Types/ContextProps";

interface Props {
  className: string;
  handle: string;
  isFollowing?: boolean;
}

const SuggestedUserFollowButton: React.FC<Props> = (props) => {
  const [isFollowingSuggested, setIsFollowingSuggested] = useState<boolean>(
    false
  );

  const { handle, className } = props;

  const { currHandle, isFollowing }: ContextProps = useContext(AccountContext);

  // Check if following on mount
  useEffect(() => {
    if (props.isFollowing) {
      setIsFollowingSuggested(props.isFollowing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isFollowing]);

  // Link to main user if same
  useEffect(() => {
    if (handle === currHandle) {
      setIsFollowingSuggested(isFollowing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowing]);

  return (
    <div className={className}>
      {isFollowingSuggested ? (
        <UnfollowButton
          handle={handle}
          setIsFollowingSuggested={setIsFollowingSuggested}
        />
      ) : (
        <FollowButton
          handle={handle}
          setIsFollowingSuggested={setIsFollowingSuggested}
        />
      )}
    </div>
  );
};

export default SuggestedUserFollowButton;
