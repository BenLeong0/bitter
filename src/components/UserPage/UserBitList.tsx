import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Shared/BitList/BitList";
import "./UserBitList.css";
import "./UserFollowList.css";

import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
import HttpService from "../core/HttpService";

interface Props {
  replies: boolean;
}

const UserBitList: React.FC<Props> = ({ replies }) => {
  const httpService = new HttpService();

  // fetch list of bits
  const [bits, setBits] = useState<Array<BitInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currHandle, myHandle }: ContextProps = useContext(AccountContext);

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currHandle]);

  const fetchBits = async () => {
    setIsLoading(true);

    let res = "/users/posts";
    let queryParams = { handle: currHandle, myHandle };
    let resp: any = await httpService.makeGetRequest(res, queryParams);

    if (resp.code === "getSuccess") {
      let bits: Array<BitInfo> = JSON.parse(resp.posts);
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
