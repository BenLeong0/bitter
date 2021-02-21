import { React, useState, useEffect } from "react";
import BitList from "../Main/BitList/BitList";

const TimelineBitList = (props) => {
  // fetch list of bits
  const [bits, setBits] = useState([]);

  useEffect(() => {
    if (!props.hasOwnProperty("myId")) {
      return;
    }
    fetchBits();
  }, [props.myId]);

  const fetchBits = async () => {
    const data = await fetch(
      `${props.API_URL}bits/timeline?user_id=${props.myId}`
    );
    const items = await data.json();
    setBits(items);
  };

  // pass into BitList

  return <BitList {...props} bits={bits} />;
};

export default TimelineBitList;
