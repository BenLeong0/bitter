import React from "react";
import { Link } from "react-router-dom";

const UserSuggestion = (props) => {
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
              {props.displayName}
            </div>
            <div className="user-suggestion-handle">@{props.handle}</div>
          </div>
        </Link>
        <div className="user-suggestion-follow">
          <button>Follow</button>
        </div>
      </div>
    </>
  );
};

export default UserSuggestion;
