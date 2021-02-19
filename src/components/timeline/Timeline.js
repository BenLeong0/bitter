import React from "react";
import "./Timeline.css";
import PostBit from "./PostBit";
import BitList from "./BitList";

const Timeline = () => {
  return (
    <div className="timeline">
      <PostBit />
      <BitList />
    </div>
  );
};

export default Timeline;
