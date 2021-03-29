import React, { useContext } from "react";
import ReplyButton from "./reply.svg";
import RebitButton from "./rebit.svg";
import LikeButton from "./like.svg";
import DislikeButton from "./dislike.svg";
import { AccountContext } from "../../Account";

import BitInfo from "../../../Types/BitInfo";
// interface BitInfo {
//   content: string;
//   dislikes: number;
//   display_name: string;
//   handle: string;
//   index: number;
//   likes: number;
//   post_id: number;
//   post_time: string;
//   replies: number;
//   reply_to: number;
//   reposts: number;
//   status: number;
//   user_id: string;
// }

const BitButtonBar: React.FC<BitInfo> = (props) => {
  const reply = () => {
    console.log(`reply to tweet ${props.post_id}`);
    console.log(JSON.stringify(props));
  };

  const rebit = () => {
    console.log(`rebit tweet ${props.post_id}`);
  };

  const like = () => {
    console.log(`like tweet ${props.post_id}`);
  };

  const dislike = () => {
    console.log(`dislike tweet ${props.post_id}`);
  };

  return (
    <div className="bit-buttons">
      <input
        type="image"
        src={ReplyButton}
        alt="reply button"
        onClick={reply}
      />
      <input
        type="image"
        src={RebitButton}
        alt="rebit button"
        onClick={rebit}
      />
      <input type="image" src={LikeButton} alt="like button" onClick={like} />
      <input
        type="image"
        src={DislikeButton}
        alt="dislike button"
        onClick={dislike}
      />
    </div>
  );
};

export default BitButtonBar;
