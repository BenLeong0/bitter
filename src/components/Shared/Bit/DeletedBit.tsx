import React from "react";

export interface DeletedBitProps {
  classes: string;
}

const DeletedBit: React.FC<DeletedBitProps> = ({ classes }) => {
  return (
    <div className={"bit " + classes}>
      <div className="deleted-bit">This bit has been deleted</div>
      <hr className="bit-splitter" />
    </div>
  );
};

export default DeletedBit;
