import React from "react";
import Bit from "./Bit";
import "./Bits.css";

interface BitType {
  content: string;
  dislikes: number;
  display_name: string;
  handle: string;
  index: number;
  likes: number;
  post_id: number;
  post_time: string;
  replies: number;
  reply_to: number;
  reposts: number;
  status: number;
  user_id: number;
}

interface Props {
  bits: Array<BitType>;
}

const BitList: React.FC<Props> = ({ bits }) => {
  // retrieve bits from props

  return (
    <>
      {bits.map((bit, index) => (
        <Bit {...bit} key={bit.post_id} index={index} />
      ))}
    </>
  );
};

export default BitList;
