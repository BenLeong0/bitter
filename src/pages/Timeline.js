import React from "react";
import PostBit from "../components/Timeline/PostBit";
import BitList from "../components/Timeline/BitList";

const Timeline = () => {
  return (
    <div className="timeline">
      <PostBit />
      <BitList />
    </div>
  );
};

export default Timeline;
