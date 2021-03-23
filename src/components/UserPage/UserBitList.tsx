import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";
import "./UserBitList.css";

interface Props {
  replies: boolean;
}

interface Bit {
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
  user_id: number;
}

const UserBitList: React.FC<Props> = ({ replies }) => {
  // fetch list of bits
  const [bits, setBits] = useState<Array<Bit>>([]);

  const { API_URL, currId }: { API_URL: string; currId: number } = useContext(
    AccountContext
  );

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currId]);

  const fetchBits = async () => {
    const data: Response = await fetch(`${API_URL}bits/user?user_id=${currId}`);
    const items: Array<Bit> = await data.json();
    setBits(items);
  };

  // pass into BitList
  return <BitList bits={bits} />;
};

export default UserBitList;
