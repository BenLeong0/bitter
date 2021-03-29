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
  const [requestCounter, setRequestCounter] = useState<number>(0);

  const {
    API_URL,
    myHandle,
    refreshList,
  }: {
    API_URL: string;
    myHandle: string;
    refreshList: boolean;
  } = useContext(AccountContext);

  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandle, refreshList]);

  const fetchBits = async () => {
    setRequestCounter(requestCounter + 1);
    const requestId = requestCounter;

    setIsLoading(true);
    setBits([]);
    console.log("Fetching bits...");

    const data = await fetch(`${API_URL}/bits/timeline?handle=${myHandle}`);
    const items: Array<BitInfo> = await data.json();

    // Only update if final request ie ignore if another request was sent out after
    if (requestId === requestCounter) {
      setBits(items);
      setIsLoading(false);
    }
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default TimelineBitList;
