import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Main/BitList/BitList";
import "./UserBitList.css";

import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
import HttpService from "../core/HttpService";

interface Props {}

const UserBitList: React.FC<Props> = () => {
  const httpService = new HttpService();

  // fetch list of bits
  const [likes, setLikes] = useState<Array<BitInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currHandle, myHandle }: ContextProps = useContext(AccountContext);

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currHandle]);

  const fetchBits = async () => {
    setIsLoading(true);
    const res = `/users/posts/likes?handle=${currHandle}&myHandle=${myHandle}`;
    const resp: any = await httpService.makeGetRequest(res);

    if (resp.code === "getSuccess") {
      const bits: Array<BitInfo> = JSON.parse(resp.posts);
      setLikes(bits);
    } else {
      setLikes([]);
    }
    setIsLoading(false);
  };

  // pass into BitList
  return <BitList bits={likes} isLoading={isLoading} />;
};

export default UserBitList;
