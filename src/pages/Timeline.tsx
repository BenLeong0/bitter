import React from "react";
import PostBit from "../components/Timeline/PostBit";
import TimelineBitList from "../components/Timeline/TimelineBitList";
import "../components/Timeline/Timeline.css";

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
