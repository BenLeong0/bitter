import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";
import "./UserBitList.css";

import BitInfo from "../../Types/BitInfo";
// interface BitInfo {
//   content: string;
//   dislikes: number;
//   display_name: string;
//   handle: string;
//   index: number;
//   likes: number;
//   post_id: number;
//   post_time: string;
//   replies: number;
//   reply_to: number;
//   reposts: number;
//   status: number;
//   user_id: number;
// }

interface Props {
  replies: boolean;
}

const UserBitList: React.FC<Props> = ({ replies }) => {
  // fetch list of bits
  const [bits, setBits] = useState<Array<BitInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currHandle }: { currHandle: string } = useContext(AccountContext);

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currHandle]);

  const fetchBits = async () => {
    setIsLoading(true);
    const data: Response = await fetch(
      `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/users/posts?handle=${currHandle}`
    );
    const items: Array<BitInfo> = await data.json();
    setBits(items);
    setIsLoading(false);
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default UserBitList;
