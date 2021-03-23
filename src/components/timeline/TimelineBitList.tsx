import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";

const TimelineBitList: React.FC<{}> = () => {
  // fetch list of bits
  const [bits, setBits] = useState([]);

  const { myId, API_URL } = useContext(AccountContext);

  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId]);

  const fetchBits = async () => {
    const data = await fetch(`${API_URL}bits/timeline?user_id=${myId}`);
    const items = await data.json();
    setBits(items);
  };
  // bits = [bit1, bit2, ....]

  // pass into BitList
  return <BitList bits={bits} />;
};

export default TimelineBitList;
