import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";
import "./UserBitList.css";

import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
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

interface Props {}

const UserBitList: React.FC<Props> = () => {
  // fetch list of bits
  const [likes, setLikes] = useState<Array<BitInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { API_URL, currHandle, myHandle }: ContextProps = useContext(
    AccountContext
  );

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currHandle]);

  const fetchBits = async () => {
    setIsLoading(true);
    const data = await fetch(
      `${API_URL}/users/posts/likes?handle=${currHandle}&myHandle=${myHandle}`
    );
    const items: Array<BitInfo> = await data.json();
    setLikes(items);
    setIsLoading(false);
  };

  // pass into BitList
  return <BitList bits={likes} isLoading={isLoading} />;
};

export default UserBitList;
