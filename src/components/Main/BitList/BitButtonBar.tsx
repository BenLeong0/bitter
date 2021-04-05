import React, { useContext, useState, useEffect } from "react";
import ReplyButton from "./reply.svg";
import RebitButton from "./rebit.svg";
import RebitedButton from "./rebited.svg";
import LikeButton from "./like.svg";
import LikedButton from "./liked.svg";
import DislikeButton from "./dislike.svg";
import DislikedButton from "./disliked.svg";
import { AccountContext } from "../../Account";

import BitInfo from "../../../Types/BitInfo";

const BitButtonBar: React.FC<BitInfo> = (props) => {
  // Affect like/dislike counter
  const [rebitShift, setRebitShift] = useState<number>(0);
  const [likeShift, setLikeShift] = useState<number>(0);
  const [dislikeShift, setDislikeShift] = useState<number>(0);

  const {
    API_URL,
    getSession,
    isLoggedIn,
  }: {
    API_URL: string;
    getSession: () => Promise<any>;
    isLoggedIn: boolean;
  } = useContext(AccountContext);

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
    console.log(`reply to tweet ${props.post_id}`);
    console.log(JSON.stringify(props));
  };

  const rebit = async () => {
    if (!isLoggedIn) return;
    setIsReposted(true);
    setRebitShift(rebitShift + 1);
    getSession().then(async ({ headers }) => {
      fetch(`${API_URL}/bits/rebit?post_id=${props.post_id}`, {
        headers,
        method: "POST",
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
  };

  const unrebit = () => {
    if (!isLoggedIn) return;
    setIsReposted(false);
    setRebitShift(rebitShift - 1);
    getSession().then(async ({ headers }) => {
      fetch(`${API_URL}/bits/rebit?post_id=${props.post_id}`, {
        headers,
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
  };

  const like = async () => {
    if (!isLoggedIn) return;
    setIsLiked(true);
    setLikeShift(likeShift + 1);
    getSession().then(async ({ headers }) => {
      fetch(`${API_URL}/bits/like?post_id=${props.post_id}`, {
        headers,
        method: "POST",
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
  };

  const unlike = async () => {
    if (!isLoggedIn) return;
    setIsLiked(false);
    setLikeShift(likeShift - 1);
    getSession().then(async ({ headers }) => {
      fetch(`${API_URL}/bits/like?post_id=${props.post_id}`, {
        headers,
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
  };

  const dislike = async () => {
    if (!isLoggedIn) return;
    setIsDisliked(true);
    setDislikeShift(dislikeShift + 1);
    getSession().then(async ({ headers }) => {
      fetch(`${API_URL}/bits/dislike?post_id=${props.post_id}`, {
        headers,
        method: "POST",
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
  };

  const undislike = async () => {
    if (!isLoggedIn) return;
    setIsDisliked(false);
    setDislikeShift(dislikeShift - 1);
    getSession().then(async ({ headers }) => {
      fetch(`${API_URL}/bits/dislike?post_id=${props.post_id}`, {
        headers,
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
  };

  return (
    <div className="bit-buttons">
      <div className="bit-stat">
        <img src={ReplyButton} alt="reply button" onClick={reply} />
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
