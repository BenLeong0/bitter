import React, { useEffect, useState } from "react";

const UserBanner: React.FC<{ handle: string }> = ({ handle }) => {
  const [src, setSrc] = useState<string>("");

  const onError = () => {
    setSrc(`${process.env.PUBLIC_URL}/placeholderbanner.png`);
  };

  useEffect(() => {
    setSrc("https://bitter-imgs.s3.eu-west-2.amazonaws.com/banner-" + handle);
  }, [handle]);

  return (
    <div className="user-banner">
      <img src={src} onError={onError} alt="profile banner" />
    </div>
  );
};

export default UserBanner;
