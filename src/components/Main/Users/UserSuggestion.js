import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import UserFollowButton from "./components/UserFollowButton";

const UserSuggestion = (props) => {
  // useEffect(() => {
  //   console.log(props);
  // }, []);

  return (
    <>
      <hr className="solid"></hr>
      <div className="user-suggestion">
        <Link to={"/u/" + props.handle}>
          <div className="user-suggestion-pfp">
            <img src="https://via.placeholder.com/48" alt="profile pic"></img>
          </div>
          <div className="user-suggestion-info">
            <div className="user-suggestion-displayname">
              {props.display_name}
            </div>
            <div className="user-suggestion-handle">@{props.handle}</div>
          </div>
        </Link>
        <UserFollowButton className="user-suggestion-follow" {...props} />
      </div>
    </>
  );
};

export default UserSuggestion;
