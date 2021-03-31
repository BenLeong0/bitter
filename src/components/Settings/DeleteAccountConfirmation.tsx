import React, { useState } from "react";
import Popup from "reactjs-popup";
import Styled from "styled-components";

export interface DeleteAccountConfirmationProps {
  onSubmit: (e: any) => Promise<void>;
  active: boolean;
}

const StyledPopup = Styled(Popup)`
  &-content {
    width: 300px;
    padding: 40px;
    text-align: center;
    transform: translateY(-160px);
    font-size: 20px;
  }
  &-content button {
    font-size: 12px;
    line-height: 28px;
    height: 28px;
  }
`;

const DeleteAccountConfirmation: React.FC<DeleteAccountConfirmationProps> = ({
  onSubmit,
  active,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => {
          if (active) {
            setOpen(true);
          }
        }}
        className="button-primary"
        style={{
          backgroundColor: "#d3455b",
          borderColor: "#d3455b",
          marginBottom: "10px",
        }}
      >
        Delete account
      </button>

      <StyledPopup open={open} modal onClose={closeModal}>
        <div style={{ marginBottom: "30px" }}>
          Are you sure you want to delete your account?
        </div>
        <button
          onClick={async (e) => {
            await onSubmit(e);
            closeModal();
          }}
          type="submit"
          className="button-primary"
          style={{
            backgroundColor: "#d3455b",
            borderColor: "#d3455b",
          }}
        >
          Delete account
        </button>
        <br />
        <button
          className="button-primary"
          onClick={closeModal}
          style={{ marginTop: "10px" }}
        >
          Cancel
        </button>
      </StyledPopup>
    </>
  );
};

export default DeleteAccountConfirmation;
