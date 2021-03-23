import React from "react";
import PostBit from "../components/Timeline/PostBit";
import TimelineBitList from "../components/Timeline/TimelineBitList";
import "../components/Timeline/Timeline.css";

const Timeline: React.FC<{}> = () => {
  return (
    <div className="timeline">
      <PostBit />
      <TimelineBitList />
    </div>
  );
};

export default Timeline;
