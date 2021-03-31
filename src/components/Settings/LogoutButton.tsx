import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import Popup from "reactjs-popup";
import Styled from "styled-components";
import { AccountContext } from "../Account";

export interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  // Confirmation popup
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => setOpen(false);

  const StyledPopup = Styled(Popup)`
  &-content {
    width: 250px;
    padding: 40px;
    text-align: center;
    font-size: 18px;
    transform: translateY(-160px)
  }
  &-content button {
    font-size: 12px;
    line-height: 28px;
    height: 28px;
  }
  `;

  const { logout } = useContext(AccountContext);
  const history = useHistory();
  const onClick = (e: any) => {
    e.preventDefault();
    // Confirmation popup !!!!

    logout();
    history.push(`/home`);
  };

  return (
    <div id="logout-button">
      <button className="button-primary" onClick={() => setOpen(true)}>
        Logout
      </button>

      <StyledPopup open={open} modal onClose={closeModal}>
        <div style={{ marginBottom: "30px" }}>
          Are you sure you want to logout?
        </div>
        <button onClick={onClick} type="submit" className="button-primary">
          Logout
        </button>
        <br />
        <button onClick={closeModal} style={{ marginTop: "10px" }}>
          Cancel
        </button>
      </StyledPopup>
    </div>
  );
};

export default LogoutButton;
