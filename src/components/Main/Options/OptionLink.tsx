import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Account";

interface Option {
  title: string;
  link: string;
  logo: string;
  requireLogin: boolean;
}

const OptionLink: React.FC<Option> = (props) => {
  const { isLoggedIn }: { isLoggedIn: boolean } = useContext(AccountContext);
  const { requireLogin, link } = props;

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
