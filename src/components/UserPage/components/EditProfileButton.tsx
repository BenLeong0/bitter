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
    if (changesSubmitted) history.go(0);
    setOpen(false);
    resetInputs();
  };
  const history = useHistory();

  const maxDisplayNameLength = 25;
  const maxBioLength = 160;

  //#region states
  // Input field states
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Error messages
  const [textErrorOccurred, setTextErrorOccurred] = useState<boolean>(false);
  const [pfpErrorOccurred, setPfpErrorOccurred] = useState<boolean>(false);
  const [bannerErrorOccurred, setBannerErrorOccurred] = useState<boolean>(
    false
  );

  // Images
  const [pfp, setPfp] = useState<any>(undefined);
  const [banner, setBanner] = useState<any>(undefined);

  // Record if changes made
  const [textChanged, setTextChanged] = useState<boolean>(false);
  const [changesSubmitted, setChangesSubmitted] = useState<boolean>(false);

  const textButtonActive: boolean =
    textChanged &&
    displayName.trim().length > 0 &&
    displayName.trim().length <= maxDisplayNameLength &&
    bio.trim().length <= maxBioLength;
  //#endregion

  const { getSession, API_URL }: ContextProps = useContext(AccountContext);

  const resetInputs = () => {
    if (props.display_name) {
      setDisplayName(props.display_name);
    }
    if (props.bio) {
      setBio(props.bio);
    }
    setTextChanged(false);
    setPfp(undefined);
    setBanner(undefined);
  };

  // Update input fields on page load
  useEffect(() => {
    resetInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  //#region text fields
  // Inputting changes
  const handleBioChange = (e: any) => {
    const { value } = e.target;
    setBio(value);
    setTextChanged(true);
  };
  const handleDisplayNameChange = (e: any) => {
    const { value } = e.target;
    setDisplayName(value);
    setTextChanged(true);
  };

  // Submit text field changes
  const onSubmitText = async (e: any) => {
    e.preventDefault();

    // Remove whitespace from start and end
    setBio(bio.trim());
    setDisplayName(displayName.trim());

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
            setChangesSubmitted(true);
          } else {
            // Error message
            setTextErrorOccurred(true);
          }
        });

      // Set not loading
      setIsLoading(false);
    });
  };
  //#endregion

  //#region pfp
  const handlePfpChange = async (e: any) => {
    const file: any = e.target.files[0];
    setPfp(file);
  };

  const onSubmitPfp = async (e: any) => {
    e.preventDefault();
  };
  //#endregion

  //#region banner
  const handleBannerChange = async (e: any) => {
    const file: any = e.target.files[0];
    setBanner(file);
  };

  const onSubmitBanner = async (e: any) => {
    e.preventDefault();

    // Convert banner to base64
    const base64File = await toBase64(banner);
    if (typeof base64File !== "string") return;

    getSession().then(async ({ headers }) => {
      // Set loading
      setIsLoading(true);

      // Set content type (necessary)
      headers["Content-Type"] = "application/json";

      // Request options
      var requestOptions = {
        headers,
        method: "PUT",
        body: JSON.stringify({
          image: base64File,
          field: "banner",
          type: banner.type,
        }),
      };

      // Post to api
      await fetch(`${API_URL}/users`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const resultJSON = JSON.parse(result);

          // Success/failure handling
          if (resultJSON.code === "uploadSuccess") {
            // Refresh page
            setChangesSubmitted(true);
            setBanner(undefined);
          } else {
            // Error message
            setBannerErrorOccurred(true);
          }
        });

      // Set not loading
      setIsLoading(false);
    });
  };
  //#endregion

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
            <form onSubmit={onSubmitText}>
              <div className="edit-profile-label">Change display name</div>
              <TextareaAutosize
                className="edit-profile-input"
                placeholder="Display name"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
              {/* Display name empty */}
              {displayName.trim().length === 0 ? (
                <div className="form-error-message">
                  Display name cannot be empty
                </div>
              ) : (
                ""
              )}
              {/* Display name too long */}
              {displayName.trim().length > maxDisplayNameLength ? (
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
              {bio.trim().length > maxBioLength ? (
                <div className="form-error-message">Bio too long</div>
              ) : (
                ""
              )}
              {/* Post error occurred */}
              {textErrorOccurred ? (
                <div className="form-error-message">An error occurred</div>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="button-primary edit-profile-button"
                style={{ opacity: textButtonActive ? 1 : 0.5 }}
                disabled={!textButtonActive}
              >
                Submit changes
              </button>
            </form>

            <hr />

            <div className="edit-profile-label">Change profile picture</div>
            <input
              type="file"
              name="upload-pfp"
              accept=".jpeg, .png, .jpg"
              id="upload-pfp"
              onChange={handlePfpChange}
            />
            <div className="image-rec-size">(Recommended size: 140x140)</div>
            <button
              className="button-primary edit-profile-button"
              style={{ opacity: pfp === undefined ? 0.5 : 1 }}
              disabled={pfp === undefined}
              onClick={onSubmitPfp}
            >
              Submit change
            </button>

            <hr />

            <div className="edit-profile-label">Change banner</div>
            <input
              type="file"
              name="upload-banner"
              accept=".jpeg, .png, .jpg"
              id="upload-banner"
              onChange={handleBannerChange}
            />
            <div className="image-rec-size">(Recommended size: 600x150)</div>
            <button
              className="button-primary edit-profile-button"
              style={{ opacity: banner === undefined ? 0.5 : 1 }}
              disabled={banner === undefined}
              onClick={onSubmitBanner}
            >
              Submit change
            </button>

            <hr />

            <button onClick={closeModal} style={{ marginTop: "10px" }}>
              Cancel
            </button>
          </>
        )}
      </StyledPopup>
    </>
  );
};

export default EditProfileButton;
