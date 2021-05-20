import React, { useContext, useState, useEffect } from "react";
import ReplyButton from "./Icons/reply.svg";
import ReplyingButton from "./Icons/replied.svg";
import RebitButton from "./Icons/rebit.svg";
import RebitedButton from "./Icons/rebited.svg";
import LikeButton from "./Icons/like.svg";
import LikedButton from "./Icons/liked.svg";
import DislikeButton from "./Icons/dislike.svg";
import DislikedButton from "./Icons/disliked.svg";
import { AccountContext } from "../../Account";

import BitInfo from "../../../Types/BitInfo";
import ContextProps from "../../../Types/ContextProps";
import HttpService from "../../core/HttpService";
import InteractionsService from "../../core/InteractionsService";

interface OtherProps {
  toggleReplying: () => void;
  replying: boolean;
}

type BitButtonBarProps = BitInfo & OtherProps;

const BitButtonBar: React.FC<BitButtonBarProps> = ({
  toggleReplying,
  replying,
  ...props
}) => {
  const httpService = new HttpService();
  const interactionsService = new InteractionsService();

  // Affect like/dislike counter
  const [rebitShift, setRebitShift] = useState<number>(0);
  const [likeShift, setLikeShift] = useState<number>(0);
  const [dislikeShift, setDislikeShift] = useState<number>(0);

  const { isLoggedIn }: ContextProps = useContext(AccountContext);

  const [isReposted, setIsReposted] = useState<boolean>(
    typeof props.isReposted === "undefined" ? false : props.isReposted
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(
    typeof props.isDisliked === "undefined" ? false : props.isDisliked
  );

  useEffect(() => {
    setIsReposted(
      typeof props.isReposted === "undefined" ? false : props.isReposted
    );
    setIsLiked(typeof props.isLiked === "undefined" ? false : props.isLiked);
    setIsDisliked(
      typeof props.isDisliked === "undefined" ? false : props.isDisliked
    );
  }, [props.isReposted, props.isLiked, props.isDisliked]);

  const reply = () => {
    toggleReplying();
    console.log(`reply to tweet ${props.post_id}`);
    console.error("CHANGE REPLY ICON COLOUR");
    console.log(JSON.stringify(props));
  };

  const rebit = async () => {
    if (!isLoggedIn) return;
    setIsReposted(true);
    setRebitShift(rebitShift + 1);
    interactionsService.rebitPost(props.post_id);
  };

  const unrebit = async () => {
    if (!isLoggedIn) return;
    setIsReposted(false);
    setRebitShift(rebitShift - 1);
    interactionsService.unrebitPost(props.post_id);
  };

  const like = async () => {
    if (!isLoggedIn) return;
    setIsLiked(true);
    setLikeShift(likeShift + 1);
    interactionsService.likePost(props.post_id);
  };

  const unlike = async () => {
    if (!isLoggedIn) return;
    setIsLiked(false);
    setLikeShift(likeShift - 1);
    interactionsService.unlikePost(props.post_id);
  };

  const dislike = async () => {
    if (!isLoggedIn) return;
    setIsDisliked(true);
    setDislikeShift(dislikeShift + 1);
    interactionsService.dislikePost(props.post_id);
  };

  const undislike = async () => {
    if (!isLoggedIn) return;
    setIsDisliked(false);
    setDislikeShift(dislikeShift - 1);
    interactionsService.undislikePost(props.post_id);
  };

  return (
    <div className="bit-buttons">
      <div className="bit-stat">
        {replying ? (
          <img src={ReplyingButton} alt="reply button" onClick={reply} />
        ) : (
          <img src={ReplyButton} alt="reply button" onClick={reply} />
        )}
        <div className="bit-stat-count">{props.replies}</div>
      </div>

      <div className="bit-stat">
        {isReposted ? (
          <img src={RebitedButton} alt="rebit button" onClick={unrebit} />
        ) : (
          <img src={RebitButton} alt="rebit button" onClick={rebit} />
        )}
        <div className="bit-stat-count">{props.reposts + rebitShift}</div>
      </div>

      <div className="bit-stat">
        {isLiked ? (
          <img src={LikedButton} alt="liked button" onClick={unlike} />
        ) : (
          <img src={LikeButton} alt="like button" onClick={like} />
        )}
        <div className="bit-stat-count">{props.likes + likeShift}</div>
      </div>

      <div className="bit-stat">
        {isDisliked ? (
          <img src={DislikedButton} alt="disliked button" onClick={undislike} />
        ) : (
          <img src={DislikeButton} alt="dislike button" onClick={dislike} />
        )}
        <div className="bit-stat-count">{props.dislikes + dislikeShift}</div>
      </div>
    </div>
  );
};

export default BitButtonBar;
