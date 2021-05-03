import React, { useContext, useEffect, useState } from "react";
import BitButtonBar from "./BitButtonBar";
import { Link } from "react-router-dom";
import OutsideAlerter from "./OutsideAlerter";

import BitInfo from "../../../Types/BitInfo";
import BitTag from "./BitTag";
import { AccountContext } from "../../Account";
import DeleteButton from "./Icons/delete.svg";
import RebitedButton from "./Icons/rebited.svg";
import RepliedButton from "./Icons/replied.svg";
import ContextProps from "../../../Types/ContextProps";
import BitReplyBox from "./BitReplyBox";

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

interface OtherProps {
  classes?: string;
}

type BitProps = BitInfo & OtherProps;

function timestampFormat(post_time: string): string {
  const bitTime: Date = new Date(post_time);
  const milliseconds: number = Date.now() - bitTime.getTime(); // Difference in milliseconds

  const months: Array<string> = [
    "Jan ",
    "Feb ",
    "Mar ",
    "Apr ",
    "May ",
    "Jun ",
    "Jul ",
    "Aug ",
    "Sep ",
    "Oct ",
    "Nov ",
    "Dec ",
  ];

  var temp: number = Math.floor(milliseconds / 1000);

  var days: number = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    // Full date if over a month ago, show year if not current year
    if (days > 30) {
      const day: string = String(bitTime.getDate());
      const month: string = months[bitTime.getMonth()];
      const year: string =
        bitTime.getFullYear() === new Date().getFullYear()
          ? ""
          : ", bitTime.getFullYear()";

      return month + day + year;
    }

    return days + "d";
  }
  var hours: number = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + "h";
  }
  var minutes: number = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + "m";
  }
  var seconds: number = temp % 60;
  if (seconds) {
    return seconds + "s";
  }
  return "less than a second"; //'just now' //or other string you like;
}

function formatDate(date: Date) {
  var hours: any = date.getHours();
  var minutes: any = date.getMinutes();
  var ampm: any = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
}

const Bit: React.FC<BitProps> = ({ classes = "", ...bitInfo }) => {
  const { API_URL, getSession, isAdmin, myHandle }: ContextProps = useContext(
    AccountContext
  );

  // Profile pic src
  const [src, setSrc] = useState<string>("");
  const onError = () => {
    setSrc(`${process.env.PUBLIC_URL}/placeholder48.png`);
  };
  useEffect(() => {
    setSrc(
      "https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfp-" + bitInfo.handle
    );
  }, [bitInfo.handle]);

  // Split for tags
  const splitContent = bitInfo.content.split("@");
  const initialContent = splitContent[0];

  // myHandle to show/hide delete button
  const myPost = myHandle === bitInfo.handle;

  // Hook to hide tweet after deleting
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  // Hook to toggle reply text box
  const [replying, setReplying] = useState<boolean>(false);
  const toggleReplying = (): void => setReplying(!replying);

  if (typeof bitInfo.rebitter !== "undefined" || bitInfo.reply_to !== null) {
    classes += " reply-bit";
  }

  // Delete button
  const handleDeletePost = async (e: any) => {
    e.preventDefault();
    getSession().then(async ({ headers }) => {
      // Request options
      var requestOptions = {
        headers,
        method: "DELETE",
      };

      // Call API
      await fetch(`${API_URL}/bits?post_id=${bitInfo.post_id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const resultJSON = JSON.parse(result);

          // success/failure handling
          if (resultJSON.code === "deleteSuccess") {
            // Hide post
            setIsDeleted(true);
          } else {
            // Error message
            console.log(result);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          // setErrorOccurred(true);
        });
    });
  };

  // Delete popover
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  // Numbers for interactions
  return (
    <div
      className={"bit " + classes}
      style={{
        display: isDeleted ? "none" : "",
      }}
    >
      <div className="bit-message">
        {/* Show who replied to if reply */}
        <div
          className="bit-reply-author"
          style={{
            display: bitInfo.reply_to === null ? "none" : "",
            top: typeof bitInfo.rebitter === "undefined" ? "4px" : "20px",
          }}
        >
          <img src={RepliedButton} alt="rebit button" />
          <Link to={`/b/${bitInfo.reply_to}`}>
            <span style={{ color: "#10b" }}>Reply</span>
          </Link>{" "}
          to
          <Link to={`/u/${bitInfo.reply_author}`}>
            {" "}
            @{bitInfo.reply_author}
          </Link>
          <span
            style={{
              display: typeof bitInfo.rebitter === "undefined" ? "none" : "",
              color: "black",
            }}
          >
            {" "}
            ・{" "}
          </span>
        </div>

        {/* Show who rebitted if rebit */}
        <div
          className="bit-rebitter"
          style={{
            display: typeof bitInfo.rebitter === "undefined" ? "none" : "",
          }}
        >
          <img src={RebitedButton} alt="rebit button" />
          <span>Rebitted by </span>
          <Link to={`/u/${bitInfo.rebitter}`}>@{bitInfo.rebitter}</Link>
        </div>
      </div>

      {/* Poster profile picture */}
      <Link to={`/u/${bitInfo.handle}`}>
        <div className="bit-pfp">
          <img src={src} onError={onError} alt="profile pic" />
        </div>
      </Link>

      <div className="bit-content">
        {/* Poster info */}
        <div className="bit-info">
          <Link to={`/u/${bitInfo.handle}`}>
            <span className="bit-info-displayname">{bitInfo.display_name}</span>
            <span className="bit-info-handle">@{bitInfo.handle}</span>
          </Link>
          ・
          <Link to={`/b/${bitInfo.post_id}`}>
            <span
              className="bit-info-time"
              title={formatDate(new Date(bitInfo.post_time))}
            >
              {timestampFormat(bitInfo.post_time)}
            </span>
          </Link>
        </div>

        <input
          type="image"
          className="bit-delete"
          src={DeleteButton}
          alt="dislike button"
          onClick={() => setIsPopoverOpen(true)}
          style={{ display: myPost || isAdmin ? "block" : "none" }}
        />

        <OutsideAlerter
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
        >
          <div
            className="bit-delete-popover"
            style={{ display: isPopoverOpen ? "block" : "none" }}
            // handleClickOutside={() => setIsPopoverOpen(false)}
          >
            <button
              className="button-primary delete-post"
              onClick={handleDeletePost}
            >
              Delete post
            </button>
            <div className="delete-post-arrow" />
          </div>
        </OutsideAlerter>

        <div className="bit-text">
          {initialContent}
          {splitContent.slice(1).map((tag, index) => (
            <BitTag tag={tag} key={index} />
          ))}
        </div>
        <BitButtonBar
          {...bitInfo}
          toggleReplying={toggleReplying}
          replying={replying}
        />
      </div>
      {replying ? (
        <BitReplyBox post_id={bitInfo.post_id} setReplying={setReplying} />
      ) : (
        ""
      )}
      <hr className="bit-splitter" />
    </div>
  );
};

export default Bit;
