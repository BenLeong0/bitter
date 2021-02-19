import React from "react";
import BitButtonBar from "./BitButtonBar";
import { Link } from "react-router-dom";

const Bit = (props) => {
  // convert timestamp to time passed
  return (
    <div className="bit">
      <Link to={"/u/" + props.handle}>
        <div className="bit-pfp">
          <img src="https://via.placeholder.com/48" alt="profile pic"></img>
        </div>
      </Link>
      <div className="bit-content">
        <div className="bit-info">
          <Link to={"/u/" + props.handle}>
            <span className="bit-info-displayname">{props.display_name}</span>
            <span className="bit-info-handle">@{props.handle}</span>
          </Link>
          ・
          <Link to={"/t/" + props.id}>
            <span className="bit-info-time">8hr</span>
          </Link>
        </div>
        <div className="bit-text"> {props.content} </div>
        <BitButtonBar {...props} />
      </div>
    </div>
  );
};

export default Bit;
