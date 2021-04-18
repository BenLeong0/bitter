import React from "react";
import BitInfo from "../../Types/BitInfo";
import Bit from "../Main/BitList/Bit";

export interface PreThreadProps {
  bit: BitInfo;
}

const PreThread: React.FC<PreThreadProps> = ({ bit }) => {
  if (typeof bit.pre_thread === "undefined") {
    return <></>;
  }

  return (
    <div className="prethread">
      {bit.pre_thread.map((prebit) => (
        <Bit {...prebit} classes="prethread-bit" />
      ))}
    </div>
  );
};

export default PreThread;
