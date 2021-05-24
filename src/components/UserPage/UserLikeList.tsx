import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Shared/BitList/BitList";

import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
import BitService from "../core/BitService";

interface Props {}

const UserBitList: React.FC<Props> = () => {
  const bitService = new BitService();

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

    await bitService
      .getUserBits(currHandle, myHandle)
      .then((bits) => setLikes(bits))
      .catch((bits) => setLikes(bits));

    setIsLoading(false);
  };

  // pass into BitList
  return <BitList bits={likes} isLoading={isLoading} />;
};

export default UserBitList;
