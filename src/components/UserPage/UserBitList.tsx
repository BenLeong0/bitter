import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Shared/BitList/BitList";

import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
import BitService from "../core/BitService";

interface Props {
  showReplies: boolean;
}

const UserBitList: React.FC<Props> = ({ showReplies }) => {
  const bitService = new BitService();

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

    await bitService
      .getUserBits(currHandle, myHandle)
      .then((bits) => setBits(bits))
      .catch((bits) => setBits(bits));

    setIsLoading(false);
  };

  // pass into BitList
  return (
    <BitList
      bits={showReplies ? bits : bits.filter((post) => !post.reply_to)}
      isLoading={isLoading}
    />
  );
};

export default UserBitList;
