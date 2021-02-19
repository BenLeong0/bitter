import React from "react";
import ReplyButton from "./reply.svg";
import RebitButton from "./rebit.svg";
import LikeButton from "./like.svg";
import DislikeButton from "./dislike.svg";

const BitButtonBar = (props) => {
  const reply = () => {
    console.log(`reply to tweet ${props.index}`);
  };

  const rebit = () => {
    console.log(`rebit tweet ${props.index}`);
  };

  const like = async () => {
    var formdata = new FormData();
    formdata.append("username", "userben");
    formdata.append("password", "passwordman");

    fetch("http://localhost:8000/rest-auth/login/", {
      method: "POST",
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => printResp(result))
      .catch((error) => console.log("error", error));
  };

  const printResp = (resp) => {
    console.log(resp);
  };

  const dislike = () => {
    console.log(`dislike tweet ${props.index}`);
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
