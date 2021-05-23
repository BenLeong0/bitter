import React from "react";
import PostBit from "./PostBit";
import TimelineBitList from "./TimelineBitList";
import "./Timeline.css";

const Timeline: React.FC<{ timelineType: string }> = ({ timelineType }) => {
  const pageTitle = timelineType === "all" ? "All posts" : "Home";
  document.title = `${pageTitle} / Bitter`;

  return (
    <div className="timeline">
      <PostBit />
      <TimelineBitList timelineType={timelineType} />
    </div>
  );
};

export default Timeline;
