import React from "react";
import Bit from "./Bit";

const BitList = (props) => {
  // retrieve bits from backend

  class BitBlob {
    constructor(id, handle, display_name, content) {
      this.id = id;
      this.handle = handle;
      this.display_name = display_name;
      this.content = content;
    }
  }

  const bits = [
    new BitBlob(
      123,
      "ben",
      "NoPressure1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    ),
    new BitBlob(1268, "sam", "GodFluxxy", "test bit"),
    new BitBlob(
      13,
      "ben",
      "NoPressure1",
      "456n4w754gb45uv5e6ue5ube5uve5u6jdr6udrv5udr57w4643cye45yue4ue56ujv56jr56jr56jr56jk5rik5j56bjr"
    ),
    new BitBlob(1, "ben", "NoPressure1", "test bit"),
    new BitBlob(12, "isaac", "Firecapp", "test bit"),
    new BitBlob(18, "ben", "NoPressure1", "test bit"),
    new BitBlob(128, "isaac", "Firecapp", "test bit"),
    new BitBlob(195, "ben", "NoPressure1", "test bit"),
    new BitBlob(141, "isaac", "Firecapp", "test bit"),
    new BitBlob(133, "ben", "NoPressure1", "test bit"),
    new BitBlob(1125, "isaac", "Firecapp", "test bit"),
  ];

  return (
    <>
      {bits.map((bit, index) => (
        <Bit {...bit} key={bit.id} index={index} />
      ))}
    </>
  );
};

export default BitList;
