import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Shared/BitList/BitList";
import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
import BitService from "../core/BitService";

const TimelineBitList: React.FC<{ timelineType: string }> = ({
  timelineType,
}) => {
  const bitService = new BitService();

  // fetch list of bits
  const [bits, setBits] = useState<Array<BitInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestCounter, setRequestCounter] = useState<number>(0);

  const { myHandle, refreshList }: ContextProps = useContext(AccountContext);

  useEffect(() => {
    fetchBits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandle, refreshList]);

  const fetchBits = async () => {
    setRequestCounter(requestCounter + 1);
    const requestId = requestCounter;

    setIsLoading(true);

    console.log("Fetching bits...");

    await bitService
      .getTimeline(timelineType, myHandle)
      .then((bits) => {
        if (requestId === requestCounter) setBits(bits);
      })
      .catch((bits) => {
        if (requestId === requestCounter) setBits(bits);
      })
      .finally(() => {
        if (requestId === requestCounter) setIsLoading(false);
      });
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default TimelineBitList;
