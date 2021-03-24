import React from "react";
import BitButtonBar from "./BitButtonBar";
import { Link } from "react-router-dom";

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
//   user_id: number;
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
      const day: string = String(bitTime.getDay());
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
  // convert timestamp to time passed
  const bitTime: Date = new Date(bitInfo.post_time);
  const timeString: string = timestampFormat(bitTime);

  // If user_id === props.myId then give option to delete

  // Numbers for interactions
  return (
    <div className="bit">
      <Link to={`/u/${bitInfo.handle}`}>
        <div className="bit-pfp">
          <img src={"https://via.placeholder.com/48"} alt="profile pic"></img>
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
        <div className="bit-text"> {bitInfo.content} </div>
        <BitButtonBar {...bitInfo} />
      </div>
    </div>
  );
};

export default Bit;
