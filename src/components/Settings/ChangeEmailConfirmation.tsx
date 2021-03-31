import React, { useState } from "react";
import Popup from "reactjs-popup";
import Styled from "styled-components";
import "reactjs-popup/dist/index.css";

export interface ChangeEmailConfirmationProps {
  onSubmit: (e: any) => Promise<void>;
  newEmail: string;
}

const StyledPopup = Styled(Popup)`
  &-content {
    width: 300px;
    padding: 40px;
    text-align: center;
  }
`;

const ChangeEmailConfirmation: React.FC<ChangeEmailConfirmationProps> = ({
  onSubmit,
  newEmail,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Submit</button>
      <StyledPopup open={open} modal>
        <div style={{ marginBottom: "30px" }}>
          Are you sure you want to change your email to <b>{newEmail}</b>?
        </div>
        <button
          onClick={async (e) => {
            await onSubmit(e);
            closeModal();
          }}
          type="submit"
          className="button-primary"
        >
          Change email
        </button>
        <br />
        <button onClick={closeModal} style={{ marginTop: "10px" }}>
          Cancel
        </button>
      </StyledPopup>
    </>
  );
};

export default ChangeEmailConfirmation;
