import React from "react";
import BitInfo from "../../Types/BitInfo";
import Bit from "../Main/BitList/Bit";

const ReplyThread: React.FC<{ thread: Array<BitInfo> }> = ({ thread }) => {
  console.log("wow", thread);

  return (
    <div className="reply-thread">
      {thread.map((reply) => (
        <Bit {...reply} classes="reply-thread-bit" />
      ))}
    </div>
  );
};

export default ReplyThread;
