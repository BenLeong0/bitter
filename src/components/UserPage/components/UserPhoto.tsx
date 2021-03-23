import React from "react";

interface Props {
  user_id: number | null;
}

const UserPhoto: React.FC<Props> = ({ user_id }) => {
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
