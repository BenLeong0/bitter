import React from "react";

const UserBanner: React.FC<{ user_id: number }> = ({ user_id }) => {
  const imageHeight: number = 150;

  return (
    <div className="user-banner">
      <img
        src={`https://via.placeholder.com/600x${imageHeight}?text=Banner`}
        alt="profile banner"
      />
    </div>
  );
};

export default UserBanner;
