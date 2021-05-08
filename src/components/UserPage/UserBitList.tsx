import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";
import "./UserBitList.css";
import "./UserFollowList.css";

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

interface Props {
  replies: boolean;
}

const UserBitList: React.FC<Props> = ({ replies }) => {
  // fetch list of bits
  const [bits, setBits] = useState<Array<BitInfo>>([]);
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
      `${API_URL}/users/posts?handle=${currHandle}&myHandle=${myHandle}`
    );
    const resp: any = await data.json();

    if (resp.code === "getSuccess") {
      const bits: Array<BitInfo> = JSON.parse(resp.posts);
      setBits(bits);
    } else {
      setBits([]);
    }
    setIsLoading(false);
  };

  // pass into BitList
  return (
    <BitList
      bits={replies ? bits : bits.filter((post) => !post.reply_to)}
      isLoading={isLoading}
    />
  );
};

export default UserBitList;
