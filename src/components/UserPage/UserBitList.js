import { React, useState, useEffect } from "react";
import BitList from "../Main/BitList/BitList";
import "./UserBitList.css";

const UserBitList = (props) => {
  // fetch list of bits
  const [bits, setBits] = useState([]);

  useEffect(() => {
    if (!props.hasOwnProperty("currId")) {
      return;
    }
    console.log(props.currId);
    fetchBits();
  }, [props.currId]);

  const fetchBits = async () => {
    console.log("YO" + props.currId);
    const data = await fetch(
      `${props.API_URL}bits/user?user_id=${props.currId}`
    );
    const items = await data.json();
    setBits(items);
  };

  // pass into BitList

  return <BitList {...props} bits={bits} />;
};

export default UserBitList;
