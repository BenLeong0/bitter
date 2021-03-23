import React from "react";

interface Props {
  user_id: number | null;
}

const UserBanner: React.FC<Props> = ({ user_id }) => {
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
