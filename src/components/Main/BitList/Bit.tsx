import React from "react";
import BitButtonBar from "./BitButtonBar";
import { Link } from "react-router-dom";

interface Props {
  content: string;
  dislikes: number;
  display_name: string;
  handle: string;
  index: number;
  likes: number;
  post_id: number;
  post_time: string;
  replies: number;
  reply_to: number;
  reposts: number;
  status: number;
  user_id: number;
}

function timestampFormat(bitTime: Date): string {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();
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

  var temp = Math.floor(milliseconds / 1000);

  var days = Math.floor((temp %= 31536000) / 86400);
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
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + "h";
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + "m";
  }
  var seconds = temp % 60;
  if (seconds) {
    return seconds + "s";
  }
  return "less than a second"; //'just now' //or other string you like;
}

const Bit: React.FC<Props> = (props) => {
  // convert timestamp to time passed
  const bitTime: Date = new Date(props.post_time);
  const timeString = timestampFormat(bitTime);

  // If user_id === props.myId then give option to delete

  // Numbers for interactions
  return (
    <div className="bit">
      <Link to={`/u/${props.handle}`}>
        <div className="bit-pfp">
          <img src={"https://via.placeholder.com/48"} alt="profile pic"></img>
        </div>
      </Link>

      <div className="bit-content">
        <div className="bit-info">
          <Link to={`/u/${props.handle}`}>
            <span className="bit-info-displayname">{props.display_name}</span>
            <span className="bit-info-handle">@{props.handle}</span>
          </Link>
          ・
          <Link to={`/t/${props.post_id}`}>
            <span className="bit-info-time">{timeString}</span>
          </Link>
        </div>
        <div className="bit-text"> {props.content} </div>
        <BitButtonBar {...props} />
      </div>
    </div>
  );
};

export default Bit;
