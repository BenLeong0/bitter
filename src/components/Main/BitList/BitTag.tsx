import React from "react";
import { Link } from "react-router-dom";

export interface BitTagProps {
  tag: string;
}

const BitTag: React.FC<BitTagProps> = ({ tag }) => {
  const validChars: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // No tag if first character isn't a letter or digit (invalid handle)
  if (!validChars.includes(tag[0])) {
    return <>@{tag}</>;
  }

  // Up to where are chars letters? (Tag up to that point)
  let i = 1;
  while (i < tag.length) {
    if (!validChars.includes(tag[i])) {
      break;
    } else {
      i++;
    }
  }

  // Split into tag and not-tag
  const taggedAccount = tag.slice(0, i);
  const postContent = tag.slice(i);

  return (
    <>
      <Link to={`/u/${taggedAccount}`} style={{ color: "#3498db" }}>
        @{taggedAccount}
      </Link>
      {postContent}
    </>
  );
};

export default BitTag;
