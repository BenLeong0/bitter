import React from "react";

const UserPhoto: React.FC<{ handle: string }> = ({ handle }) => {
  const imageHeight: number = 140;

  return (
    <div className="user-photo">
      <img
        src={`https://via.placeholder.com/${imageHeight}x${imageHeight}/000000/FFFFFF/?text=Profile+picture`}
        alt="profile pic"
      />
    </div>
  );
};

export default UserPhoto;
