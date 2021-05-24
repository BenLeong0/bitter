import React from "react";
import Bit from "../Bit/Bit";
import "./BitList.css";

import BitInfo from "../../../Types/BitInfo";

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
          <Bit {...bit} key={bit.post_id + bit.rebitter} index={index} />
        ))
      ) : (
        <div className="no-bits">No bits found</div>
      )}
    </>
  );
};

export default BitList;
