import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";

interface BitInfo {
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
  user_id: string;
}

const TimelineBitList: React.FC<{}> = () => {
  // fetch list of bits
  const [bits, setBits] = useState<Array<BitInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    myHandle,
  }: {
    myHandle: string;
  } = useContext(AccountContext);

  useEffect(() => {
    fetchBits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandle]);

  const fetchBits = async () => {
    setIsLoading(true);
    setBits([]);
    console.log("Fetching bits...");

    const url = `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/bits/timeline?handle=${myHandle}`;
    const data = await fetch(url);

    const items: Array<BitInfo> = await data.json();
    setBits(items);
    setIsLoading(false);
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default TimelineBitList;
