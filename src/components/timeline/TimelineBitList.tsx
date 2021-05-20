import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../Account";
import BitList from "../Shared/BitList/BitList";
import BitInfo from "../../Types/BitInfo";
import ContextProps from "../../Types/ContextProps";
import HttpService from "../core/HttpService";

const TimelineBitList: React.FC<{ timelineType: string }> = ({
  timelineType,
}) => {
  const httpService = new HttpService();

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

    let res = `/bits/${timelineType}`;
    let queryParams = { handle: myHandle };
    let resp: any = await httpService.makeGetRequest(res, queryParams);

    // Only update if final request ie ignore if another request was sent out after
    if (requestId === requestCounter) {
      if (resp.code === "getSuccess") {
        let bits: Array<BitInfo> = JSON.parse(resp.posts);
        setBits(bits);
      } else {
        setBits([]);
      }
      setIsLoading(false);
    }
  };

  // pass into BitList
  return <BitList bits={bits} isLoading={isLoading} />;
};

export default TimelineBitList;
