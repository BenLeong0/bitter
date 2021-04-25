import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import Popup from "reactjs-popup";
import Styled from "styled-components";
import ContextProps from "../../../Types/ContextProps";
import { AccountContext } from "../../Account";

const StyledPopup = Styled(Popup)`
  &-content {
    width: 300px;
    padding: 40px;
    text-align: center;
    transform: translateY(-160px)
  }
`;

// EDIT PROFILE

const EditProfileButton: React.FC<{ bio?: string; display_name?: string }> = (
  props
) => {
  // Whether modal is open or not
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => {
    setInputs();
    setOpen(false);
  };
  const history = useHistory();

  // Input field states
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Error messages
  const [displayNameEmpty, setDisplayNameEmpty] = useState<boolean>(false);
  const [displayNameTooLong, setDisplayNameTooLong] = useState<boolean>(false);
  const [bioTooLong, setBioTooLong] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const { getSession, API_URL }: ContextProps = useContext(AccountContext);

  const setInputs = () => {
    if (props.display_name) {
      setDisplayName(props.display_name);
    }
    if (props.bio) {
      setBio(props.bio);
    }
  };

  // Update input fields on page load
  useEffect(() => {
    setInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // Inputting changes
  const handleBioChange = (e: any) => {
    const { value } = e.target;
    if (value.length > 160) {
      setBioTooLong(true);
    } else {
      setBioTooLong(false);
    }
    setBio(value);
  };
  const handleDisplayNameChange = (e: any) => {
    const { value } = e.target;
    if (value.length === 0) {
      setDisplayNameEmpty(true);
      setDisplayNameTooLong(false);
    } else if (value.length > 25) {
      setDisplayNameEmpty(false);
      setDisplayNameTooLong(true);
    } else {
      setDisplayNameEmpty(false);
      setDisplayNameTooLong(false);
    }
    setDisplayName(value);
  };

  // Submit changes
  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Remove whitespace from start and end
    setBio(bio.trim());
    setDisplayName(displayName.trim());

    // Check lengths
    if (displayName.trim().length <= 0) {
      setDisplayNameEmpty(true);
      setDisplayNameTooLong(false);
      return;
    } else if (displayName.trim().length > 25) {
      setDisplayNameEmpty(false);
      setDisplayNameTooLong(true);
      return;
    }
    if (bio.trim().length > 160) {
      setBioTooLong(true);
      return;
    }

    getSession().then(async ({ headers }) => {
      // Set loading
      setIsLoading(true);

      // Set Content-Type (might be correct by default)
      headers["Content-Type"] = "application/json";

      // Request options
      var requestOptions = {
        headers,
        method: "PATCH",
        body: JSON.stringify({ display_name: displayName, bio: bio }),
      };

      // Post to api
      await fetch(`${API_URL}/users`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const resultJSON = JSON.parse(result);

          // Success/failure handling
          if (resultJSON.code === "updateSuccess") {
            // Refresh page
            history.go(0);
          } else {
            // Error message
            setErrorOccurred(true);

            // Set not loading
            setIsLoading(false);
          }
        });

      // Refresh page if successful
      // Else show generic error message
      closeModal();
    });
  };

  return (
    <>
      <button
        className="button"
        onClick={() => setOpen(true)}
        style={{ width: "140px" }}
      >
        Edit Profile
      </button>

      <StyledPopup open={open} modal onClose={closeModal}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="edit-profile-title">Edit Profile</div>
            <form onSubmit={onSubmit}>
              <div className="edit-profile-label">Change display name</div>
              <TextareaAutosize
                className="edit-profile-input"
                placeholder="Display name"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
              {/* Display name empty */}
              {displayNameEmpty ? (
                <div className="form-error-message">
                  Display name cannot be empty
                </div>
              ) : (
                ""
              )}
              {/* Display name too long */}
              {displayNameTooLong ? (
                <div className="form-error-message">
                  Display name is too long
                </div>
              ) : (
                ""
              )}

              <div className="edit-profile-label">Change bio</div>
              <TextareaAutosize
                className="edit-profile-input"
                placeholder="Bio"
                value={bio}
                onChange={handleBioChange}
              />
              {/* Bio too long */}
              {bioTooLong ? (
                <div className="form-error-message">Bio too long</div>
              ) : (
                ""
              )}
              {/* Post error occurred */}
              {errorOccurred ? (
                <div className="form-error-message">Bio too long</div>
              ) : (
                ""
              )}

              <div className="edit-profile-label">
                Change profile picture (140x140)
              </div>
              <input
                type="file"
                name="upload-pfp"
                accept=".jpeg, .png, .jpg"
                id="upload-pfp"
              />

              <div className="edit-profile-label">Change banner (600x150)</div>
              <input
                type="file"
                name="upload-pfp"
                accept=".jpeg, .png, .jpg"
                id="upload-pfp"
              />

              <button
                type="submit"
                className="button-primary edit-profile-button"
              >
                Save changes
              </button>
              <br />
              <button onClick={closeModal} style={{ marginTop: "10px" }}>
                Cancel
              </button>
            </form>
          </>
        )}
      </StyledPopup>
    </>
  );
};

export default EditProfileButton;
