import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Account";

const OptionLink = (props: any) => {
  const { isLoggedIn }: { isLoggedIn: boolean } = useContext(AccountContext);
  const { requireLogin, link }: { requireLogin: boolean; link: string } = props;

  // If user needs to be logged in but isn't, they are redirected to login page
  const address: string = !isLoggedIn && requireLogin ? "/login" : link;

  return (
    <div className="option">
      <Link to={address}>
        <div className="option-logo-box">
          <img src={props.logo} alt="logo" className="option-logo" />
        </div>
        <div className="option-title">{props.title}</div>
      </Link>
    </div>
  );
};

export default OptionLink;
