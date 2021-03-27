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

  const { API_URL, myId }: { API_URL: string; myId: string } = useContext(
    AccountContext
  );

  useEffect(() => {
    fetchBits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId]);

  const fetchBits = async () => {
    if (myId === "") {
      setBits([]);
    } else {
      console.log("fetching bits...", myId);
      setIsLoading(true);
      const data = await fetch(`${API_URL}bits/timeline?user_id=${myId}`);
      const items: Array<BitInfo> = await data.json();
      setBits(items);
    }
    setIsLoading(false);
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default TimelineBitList;
