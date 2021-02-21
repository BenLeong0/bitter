import React from "react";
import PostBit from "../components/Timeline/PostBit";
import TimelineBitList from "../components/Timeline/TimelineBitList";
import "../components/Timeline/Timeline.css";

const Timeline = (props) => {
  return (
    <div className="timeline">
      <PostBit {...props} />
      <TimelineBitList {...props} />
    </div>
  );
};

export default Timeline;
