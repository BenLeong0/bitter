import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import Popup from "reactjs-popup";
import Styled from "styled-components";
import HttpService from "../../core/HttpService";

const StyledPopup = Styled(Popup)`
  &-content {
    width: 350px;
    padding: 40px;
    text-align: center;
  }
`;

// EDIT PROFILE

const EditProfileButton: React.FC<{ bio?: string; display_name?: string }> = (
  props
) => {
  const httpService = new HttpService();

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
  const [bannerErrorOccurred, setBannerErrorOccurred] =
    useState<boolean>(false);
  const [pfpTooBig, setPfpTooBig] = useState<boolean>(false);
  const [bannerTooBig, setBannerTooBig] = useState<boolean>(false);

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
    setPfpTooBig(false);
    setBannerTooBig(false);
  };

  // Update input fields on page load
  useEffect(() => {
    resetInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

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

    // Make patch request
    setIsLoading(true);
    let res = `/users`;
    let body = { display_name: displayName, bio: bio };
    let resp: any = await httpService.makePatchRequest(res, body);

    if (resp.code === "updateSuccess") {
      // Refresh page
      setChangesSubmitted(true);
    } else {
      // Error message
      setTextErrorOccurred(true);
      console.error(resp);
    }

    setIsLoading(false);
  };
  //#endregion

  //#region pfp
  const handlePfpChange = async (e: any) => {
    const file: any = e.target.files[0];
    setPfp(file);
    setPfpTooBig(file.size > 20971520);
  };

  const onSubmitPfp = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    let res = `/users`;
    let resp: any = await httpService.uploadImage(res, pfp, "pfp");

    if (resp.code === "uploadSuccess") {
      // Refresh page
      setChangesSubmitted(true);
      setPfp(undefined);
    } else {
      // Error message
      setPfpErrorOccurred(true);
      console.error(resp);
    }

    setIsLoading(false);
  };
  //#endregion

  //#region banner
  const handleBannerChange = async (e: any) => {
    const file: any = e.target.files[0];
    setBanner(file);
    setBannerTooBig(file.size > 20971520);
  };

  const onSubmitBanner = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    let res = `/users`;
    let resp: any = await httpService.uploadImage(res, banner, "banner");

    if (resp.code === "uploadSuccess") {
      // Refresh page
      setChangesSubmitted(true);
      setBanner(undefined);
    } else {
      // Error message
      setBannerErrorOccurred(true);
      console.error(resp);
    }

    setIsLoading(false);
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
                style={{
                  opacity: textButtonActive ? 1 : 0.5,
                  cursor: !textButtonActive ? "initial" : "pointer",
                }}
                disabled={!textButtonActive}
              >
                Submit changes
              </button>
            </form>

            <hr className="edit-profile-hr" />

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
              style={{
                opacity: pfp === undefined || pfpTooBig ? 0.5 : 1,
                cursor:
                  pfp === undefined || bannerTooBig ? "initial" : "pointer",
              }}
              disabled={pfp === undefined || pfpTooBig}
              onClick={onSubmitPfp}
            >
              Upload new profile pic
            </button>
            {/* File too big */}
            {pfpTooBig ? (
              <div className="form-error-message">File too big (max 20MB)</div>
            ) : (
              ""
            )}
            {/* Post error occurred */}
            {pfpErrorOccurred ? (
              <div className="form-error-message">An error occurred</div>
            ) : (
              ""
            )}

            <hr className="edit-profile-hr" />

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
              style={{
                opacity: banner === undefined || bannerTooBig ? 0.5 : 1,
                cursor:
                  banner === undefined || bannerTooBig ? "initial" : "pointer",
              }}
              disabled={banner === undefined || bannerTooBig}
              onClick={onSubmitBanner}
            >
              Upload new banner
            </button>
            {/* File too big */}
            {bannerTooBig ? (
              <div className="form-error-message">File too big (max 20MB)</div>
            ) : (
              ""
            )}
            {/* Post error occurred */}
            {bannerErrorOccurred ? (
              <div className="form-error-message">An error occurred</div>
            ) : (
              ""
            )}

            <hr className="edit-profile-hr" />

            <button onClick={closeModal} style={{ marginTop: "20px" }}>
              Close window
            </button>
          </>
        )}
      </StyledPopup>
    </>
  );
};

export default EditProfileButton;
