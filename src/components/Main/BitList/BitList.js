import { React, useState, useEffect } from "react";
import Bit from "./Bit";
import "./Bits.css";

const BitList = (props) => {
  // retrieve bits from props

  var bits = props.bits;

  return (
    <>
      {bits.map((bit, index) => (
        <Bit {...bit} key={bit.post_id} index={index} />
      ))}
    </>
  );
};

export default BitList;
