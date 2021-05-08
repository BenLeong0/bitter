import React from "react";
import PostBit from "../components/Timeline/PostBit";
import AllBitsList from "../components/Timeline/AllBitsList";
import "../components/Timeline/Timeline.css";

const Timeline: React.FC<{}> = () => {
  document.title = "All posts / Bitter";

  return (
    <div className="timeline">
      <PostBit />
      <AllBitsList />
    </div>
  );
};

export default Timeline;
