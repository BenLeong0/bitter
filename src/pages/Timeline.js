import React from "react";
import PostBit from "../components/Timeline/PostBit";
import BitList from "../components/Timeline/BitList";
import "../components/Timeline/Timeline.css";

const Timeline = (props) => {
  return (
    <div className="timeline">
      <PostBit {...props} />
      <BitList {...props} />
    </div>
  );
};

export default Timeline;
