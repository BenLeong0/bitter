import React from "react";
import Bit from "./Bit";
import "./Bits.css";

import BitInfo from "../../../Types/BitInfo";
// interface BitInfo {
//   content: string;
//   dislikes: number;
//   display_name: string;
//   handle: string;
//   index: number;
//   likes: number;
//   post_id: number;
//   post_time: string;
//   replies: number;
//   reply_to: number;
//   reposts: number;
//   status: number;
//   user_id: string;
// }

interface Props {
  bits: Array<BitInfo>;
  isLoading: boolean;
}

const BitList: React.FC<Props> = ({ bits, isLoading }) => {
  // retrieve bits from props

  return (
    <>
      {isLoading ? (
        <div className="bitlist-loader">
          <div className="loader" />
        </div>
      ) : bits.length > 0 ? (
        bits.map((bit, index) => (
          <Bit {...bit} key={bit.post_id} index={index} />
        ))
      ) : (
        <div className="no-bits">No bits found</div>
      )}
    </>
  );
};

export default BitList;
