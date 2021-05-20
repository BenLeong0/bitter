import React, { useState } from "react";
import Popup from "reactjs-popup";
import Styled from "styled-components";

export interface ChangeEmailConfirmationProps {
  onSubmit: (e: any) => Promise<void>;
}

const StyledPopup = Styled(Popup)`
  &-content {
    width: 300px;
    padding: 40px;
    text-align: center;
    font-size: 20px;
    transform: translateY(-160px)
  }
  &-content button {
    font-size: 12px;
    line-height: 28px;
    height: 28px;
  }
`;

const ChangePasswordConfirmation: React.FC<ChangeEmailConfirmationProps> = ({
  onSubmit,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Submit
      </button>

      <StyledPopup open={open} modal onClose={closeModal}>
        <div style={{ marginBottom: "30px" }}>
          Are you sure you want to change your password?
        </div>
        <button
          onClick={async (e) => {
            await onSubmit(e);
            closeModal();
          }}
          type="submit"
          className="button-primary"
        >
          Change password
        </button>
        <br />
        <button onClick={closeModal} style={{ marginTop: "10px" }}>
          Cancel
        </button>
      </StyledPopup>
    </>
  );
};

export default ChangePasswordConfirmation;
