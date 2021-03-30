import React from "react";

const UserPhoto: React.FC<{ handle: string }> = ({ handle }) => {
  return (
    <div className="user-photo">
      <img
        src={`${process.env.PUBLIC_URL}/placeholderpfp.png`}
        alt="profile pic"
      />
    </div>
  );
};

export default UserPhoto;
