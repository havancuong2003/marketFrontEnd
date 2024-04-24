import clsx from "clsx";
import { Header } from "../../components";

import { useEffect, useState } from "react";
import { getInfoUser } from "../../services";
import axios from "axios";
import avatar from "../../assets/img/avatar-account.png";
import { useAccountInformation } from "../../hooks";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";
type ProfileProps = {
  classes?: {
    [key: string]: string;
  };
};
export const Profile: React.FC<ProfileProps> = ({ classes }) => {
  const { account, setAccount } = useAccountInformation();
  const [errorChangeUserName, setErrorChangeUserName] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPass, setIsEditingPass] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [username, setUsername] = useState(userData ? userData.username : "");
  const [errorChangePassword, setErrorChangePassword] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldpassword, setOldPassword] = useState("");

  const [erroDiff, setErroDiff] = useState("");
  useEffect(() => {
    if (userData && userData.username !== null) {
      setUsername(userData.username);
    }
  }, [userData]);
  const handleEditClick = () => {
    setIsEditing(true);
    setNewUsername(username);
  };

  const handlePassEditClick = () => {
    setIsEditingPass(true);
  };

  const handleSaveClick = async () => {
    try {
      // Call API to update username
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/account/update-username",
        {
          username: newUsername,
        }
      );

      setErrorChangeUserName("");
      // Update user data on UI
      setUsername(newUsername);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating username:", error);
      setErrorChangePassword(error.response.data.message);
      // Handle error here, maybe show a message to the user
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handlePassCancelClick = () => {
    setIsEditingPass(false);
  };

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getInfoUser();
        setUserData(data);
      } catch (error) {
        // Handle error
      }
    };
    fetchUserData();
  }, []);

  const handleChangePasswordClick = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErroDiff("Passwords do not match");
        return; // Stop further execution
      }
      setErroDiff("");
      // Call API to change password
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/account/update-password",
        {
          curentpassword: oldpassword,
          password: newPassword,
          repassword: confirmPassword,
        }
      );
      console.log(response.data, "data here");
      console.log(response, " response here");
      setErrorChangePassword([]);
      // Reset password fields
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorChangePassword(error.response.data.message);
      // Handle error here, maybe show a message to the user
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorChangePassword([]);
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setErrorChangePassword([]);
  };

  const handleConfirmPasswordChange = (e) => {
    if (newPassword !== e.target.value) {
      setErroDiff("Password not match");
      setErrorChangePassword([]);
    } else {
      setErroDiff("");
    }
    setConfirmPassword(e.target.value);
  };
  console.log(userData)
  console.log("account",account.email)
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="bg-bginventory w-full font-home">
        <div className="flex">
          <div className=" w-1/4 bg-bgprofile flex justify-center text-center h-[800px] ml-24 mt-24">
            <div className="pt-10">
              <img src={avatar} alt="" className="pb-3 p-5" />
              <p className="text-4xl font-semibold text-white pb-3">
                {account.username}
              </p>
              <p className="text-sm font-semibold text-white pb-14">
                #{account.id}
              </p>
              <ButtonInventory selectedItem={"Profile settings"} />
            </div>
          </div>
          <div className="w-2/4 bg-bgactivities ml-24 mr-24 mt-24">
            <div>
              <div className={clsx(classes?.profileHeader, "text-2xl text-white pb-20")}>
                Profile settings
              </div>
              <div className={clsx(classes?.profileInfo, "")}>
                <div className={clsx(classes?.userName, "")}>
                  <div className={clsx(classes?.layout, "flex")}>
                    <div className={clsx(classes?.sizeOfAtb, "")}>Username</div>

                    <span>
                      {isEditing ? (
                        <>
                          <p className="text-red-500">{errorChangeUserName}</p>
                          <input
                            type="text"
                            value={newUsername}
                            onChange={handleChange}
                            className="text-base text-black p-1"
                          />
                        </>
                      ) : (
                        <span>{username}</span>
                      )}
                    </span>
                  </div>

                  <div className={clsx(classes?.edit, "")}>
                    {isEditing ? (
                      <>
                        <button
                          className={clsx(classes?.editBtn, "")}
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          className={clsx(classes?.editBtn, "")}
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className={clsx(classes?.editBtn, "")}
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1131"
                  height="2"
                  viewBox="0 0 1131 2"
                  fill="none"
                  className="border border-[#574239] h-0 w-[600px]"
                >
                  <path d="M0 1H1130.43" stroke="#574239" />
                </svg>
                <div className={clsx(classes?.email, "")}>
                  <div className="flex">
                    <div className={clsx(classes?.sizeOfAtb, "")}>Email</div>

                    <span>
                      {userData
                        ? `${userData.email.substring(
                            0,
                            3
                          )}***${userData.email.substring(
                            userData.email.indexOf("@")
                          )}`
                        : ""}
                    </span>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1131"
                  height="2"
                  viewBox="0 0 1131 2"
                  fill="none"
                  className="border border-[#574239] h-0 w-[600px]"
                >
                  <path d="M0 1H1130.43" stroke="#574239" />
                </svg>
                <div className={clsx(classes?.password, "")}>
                  <div className={clsx(classes?.layout, "flex")}>
                    <div className={clsx(classes?.sizeOfAtb, "")}>Password</div>
                    <span>
                      {isEditingPass ? (
                        <>
                          <p className="text-red-500">{erroDiff}</p>
                          {Array.isArray(errorChangePassword) ? (
                            errorChangePassword.length > 0 && (
                              <p className="text-red-500">
                                {errorChangePassword.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </p>
                            )
                          ) : (
                            <p className="text-red-500">
                              {errorChangePassword}
                            </p>
                          )}
                          <label htmlFor="oldpassword">
                            Old Password
                            <input
                              type="password"
                              value={oldpassword}
                              onChange={handleOldPasswordChange}
                              id="oldpassword"
                              className="text-base text-black p-1 my-2 ml-12"
                            />
                          </label>
                          <br />

                          <label htmlFor="password">
                            New Password
                            <input
                              type="password"
                              value={newPassword}
                              onChange={handlePasswordChange}
                              id="password"
                              className="text-base text-black p-1 my-2 ml-11"
                            />
                          </label>

                          <br />
                          <label htmlFor="confirm">
                            Confirm password
                            <input
                              type="password"
                              value={confirmPassword}
                              id="confirm"
                              onChange={handleConfirmPasswordChange}
                              className="text-base text-black p-1 my-2 ml-3"
                            />
                          </label>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className={clsx(classes?.edit, "")}>
                    <div className={clsx(classes?.edit, "")}>
                      {isEditingPass ? (
                        <>
                          <button
                            className={clsx(classes?.editBtn, "")}
                            onClick={handleChangePasswordClick}
                          >
                            Save
                          </button>
                          <button
                            className={clsx(classes?.editBtn, "")}
                            onClick={handlePassCancelClick}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className={clsx(classes?.editBtn, "")}
                          onClick={handlePassEditClick}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
