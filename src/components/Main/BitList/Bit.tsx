import React, { useContext, useState } from "react";
import BitButtonBar from "./BitButtonBar";
import { Link } from "react-router-dom";
import OutsideAlerter from "./OutsideAlerter";

import BitInfo from "../../../Types/BitInfo";
import { AccountContext } from "../../Account";
import DeleteButton from "./delete.svg";

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

function timestampFormat(bitTime: Date): string {
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

const Bit: React.FC<BitInfo> = (bitInfo) => {
  const {
    API_URL,
    getSession,
  }: {
    API_URL: string;
    getSession: () => Promise<any>;
  } = useContext(AccountContext);

  // convert timestamp to time passed
  const bitTime: Date = new Date(bitInfo.post_time);
  const timeString: string = timestampFormat(bitTime);

  // myHandle to show/hide delete button
  const { myHandle }: { myHandle: string } = useContext(AccountContext);
  const myPost = myHandle === bitInfo.handle;

  // Hook to hide tweet after deleting
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

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
      await fetch(
        `${API_URL}/bits/post?post_id=${bitInfo.post_id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const resultJSON = JSON.parse(result);

          // success/failure handling
          if (resultJSON.code === "postSuccess") {
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
    <div className="bit" style={{ display: isDeleted ? "none" : "" }}>
      <Link to={`/u/${bitInfo.handle}`}>
        <div className="bit-pfp">
          <img
            src={`${process.env.PUBLIC_URL}/placeholder48.png`}
            alt="profile pic"
          />
        </div>
      </Link>

      <div className="bit-content">
        <div className="bit-info">
          <Link to={`/u/${bitInfo.handle}`}>
            <span className="bit-info-displayname">{bitInfo.display_name}</span>
            <span className="bit-info-handle">@{bitInfo.handle}</span>
          </Link>
          ・
          <Link to={`/t/${bitInfo.post_id}`}>
            <span className="bit-info-time">{timeString}</span>
          </Link>
        </div>
        <input
          type="image"
          className="bit-delete"
          src={DeleteButton}
          alt="dislike button"
          onClick={() => setIsPopoverOpen(true)}
          style={{ display: myPost ? "block" : "none" }}
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

        <div className="bit-text"> {bitInfo.content} </div>
        <BitButtonBar {...bitInfo} />
      </div>
    </div>
  );
};

export default Bit;
