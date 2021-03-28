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
    myId,
    myHandle,
  }: {
    myId: string;
    myHandle: string;
  } = useContext(AccountContext);

  useEffect(() => {
    fetchBits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId]);

  const fetchBits = async () => {
    setIsLoading(true);
    setBits([]);
    console.log("fetching bits...", myId);
    //a

    // const data = await fetch(`${API_URL}bits/timeline?user_id=${myId}`);
    const url = `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/bits/timeline?handle=${myHandle}`;
    const data = await fetch(url);

    const items: Array<BitInfo> = await data.json();
    setBits(items);
    setIsLoading(false);

    // Logged in
    // getSession().then(async ({ headers }) => {
    //   console.log("fetching bits...", myId);
    //   console.log(headers);
    //   // const data = await fetch(`${API_URL}bits/timeline?user_id=${myId}`);
    //   const url = `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/bits/timeline?user_id=${myId}`;

    //   const data = await fetch(url, { headers });

    //   const items: Array<BitInfo> = await data.json();
    //   setBits(items);
    //   setIsLoading(false);
    // });
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default TimelineBitList;
