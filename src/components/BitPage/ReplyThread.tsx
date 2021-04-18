import React from "react";
import BitInfo from "../../Types/BitInfo";
import Bit from "../Main/BitList/Bit";

const ReplyThread: React.FC<{ thread: Array<BitInfo> }> = ({ thread }) => {
  return (
    <div className="reply-thread">
      {thread.map((reply) => (
        <Bit {...reply} classes="reply-thread-bit" key={reply.post_id} />
      ))}
    </div>
  );
};

export default ReplyThread;
