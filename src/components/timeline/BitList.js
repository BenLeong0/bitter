import { React, useState, useEffect } from "react";
import Bit from "./Bit";
import "./Bits.css";

const BitList = (props) => {
  // retrieve bits from backend

  const [bits, setBits] = useState([]);

  useEffect(() => {
    fetchBits();
  }, []);

  const fetchBits = async () => {
    const data = await fetch(`${props.backend_url}bits/`);
    const items = await data.json();
    setBits(items);
  };

  return (
    <>
      {bits.map((bit, index) => (
        <Bit {...bit} key={bit.post_id} index={index} />
      ))}
    </>
  );
};

export default BitList;
