import React from "react";

const UserBanner: React.FC<{ handle: string }> = ({ handle }) => {
  return (
    <div className="user-banner">
      <img
        src={`${process.env.PUBLIC_URL}/placeholderbanner.png`}
        alt="profile banner"
      />
    </div>
  );
};

export default UserBanner;
