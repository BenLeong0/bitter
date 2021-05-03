import React, { useEffect, useState } from "react";

const UserPhoto: React.FC<{ handle: string }> = ({ handle }) => {
  const [src, setSrc] = useState<string>("");

  const onError = () => {
    setSrc(`${process.env.PUBLIC_URL}/placeholderpfp.png`);
  };

  useEffect(() => {
    setSrc("https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfp-" + handle);
  }, [handle]);

  return (
    <div className="user-photo">
      <img src={src} onError={onError} alt="profile pic" />
    </div>
  );
};

export default UserPhoto;
