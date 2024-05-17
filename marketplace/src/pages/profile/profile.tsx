import clsx from "clsx";
import { ChangeUserName, Header } from "../../components";

import { useEffect, useState } from "react";
import { useInventory } from "../../hooks";
import { getInfoUser } from "../../services";
import axios, { AxiosError } from "axios";
import { VITE_API_URL } from "../../env";
import avatar from "../../assets/img/avatar-account.png";
import { useAccountInformation } from "../../hooks/";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicModal from "../../components/common/basic-modal";
import { ChangePassword } from "../../components/change-info/change-password";
type ProfileProps = {
    classes?: {
        [key: string]: string;
    };
};

export const Profile: React.FC<ProfileProps> = ({ classes }) => {
    const [myHeros, setMyHeros] = useState<any>([]);
    const { inventory } = useInventory();

    useEffect(() => {
        if (Array.isArray(inventory)) {
            console.log();
        } else if (typeof inventory === "object" && inventory !== null) {
            // Xác định kiểu cho 'inventory' như là một đối tượng với kiểu dữ liệu cụ thể
            const inventoryObject = inventory as { data: any[] };
            setMyHeros(inventoryObject.data);
        }
    }, [inventory]);

    function countByAttribute(attribute, value) {
        // Số lượng ban đầu là 0
        let count = 0;

        // Duyệt qua từng đối tượng trong mảng inventory
        myHeros.forEach((item) => {
            // Kiểm tra xem giá trị của thuộc tính được truyền vào có trùng khớp không
            if (item[attribute] === value) {
                // Nếu trùng khớp, tăng số lượng lên 1
                count++;
            }
        });

        return count;
    }

    const { account } = useAccountInformation();
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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);

        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleEditClick = () => {
        if (isMobile) {
            handleOpenModal();
        } else {
            setIsEditing(true);
            setNewUsername(username);
        }
    };

    const handlePassEditClick = () => {
        if (isMobile) {
            handleOpenModalPassword();
        } else {
            setIsEditingPass(true);
        }
    };
    // useEffect(() => {
    //     axios
    //         .post(VITE_API_URL + "/api/v1/account/update-username", {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //             username: newUsername,
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    // }, [newUsername]);
    const handleSaveClick = async () => {
        try {
            // Call API to update username
            await axios.post(VITE_API_URL + "/api/v1/account/update-username", {
                username: newUsername,
            });

            setErrorChangeUserName("");
            // Update user data on UI
            setUsername(newUsername);
            setIsEditing(false);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error("Error updating username:", error);
                setErrorChangeUserName(error.response?.data.message);
            }
            // Handle error here, maybe show a message to the user
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handlePassCancelClick = () => {
        setIsEditingPass(false);
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
            setErroDiff("");
            // Call API to change password
            const response = await axios.post(
                VITE_API_URL + "/api/v1/account/update-password",
                {
                    curentpassword: oldpassword,
                    password: newPassword,
                    repassword: confirmPassword,
                }
            );
            console.log(response);

            setErrorChangePassword([]);
            // Reset password fields
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error("Error changing password:", error);
                setErrorChangePassword(error.response?.data.message);
            }
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
    const handleChange = (e) => {
        setNewUsername(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        if (newPassword !== e.target.value) {
            setErroDiff("Password not match");
            setErrorChangePassword([]);
            setErroDiff("Password not match");
            setErrorChangePassword([]);
        } else {
            setErroDiff("");
            setErroDiff("");
        }
        setConfirmPassword(e.target.value);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);

    const handleOpenModal = () => {
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setIsModalOpen(false);
    };
    const handeleCloseModalPassword = () => {
        setIsEditingPass(false);
        setIsModalOpenPassword(false);
    };
    const handleOpenModalPassword = () => {
        setIsEditingPass(true);
        setIsModalOpenPassword(true);
    };

    const shouldHideModal = !isMobile;

    return (
        <div className="pb-32 bg-black">
            <div>
                <Header />
            </div>

            <div className={clsx(classes?.containerProfile, "flex")}>
                <div className={clsx(classes?.avatarImage)}>
                    <span className={clsx("text-4xl text-white")}>
                        PROFILE SETTINGS
                    </span>
                    <img src={avatar} alt="" />
                    <p className={clsx(classes?.textFont, "")}>
                        {account["username"]}
                    </p>
                    <p className={clsx(classes?.textFontId, "")}>
                        #{account["id"]}
                    </p>
                </div>
                <div className={clsx(classes?.container, "")}>
                    <div className=" w-full bg-bgprofile flex justify-center text-center">
                        <div className="pt-10">
                            <img src={avatar} alt="" className="pb-3 p-5" />
                            <p className="text-4xl font-semibold text-white pb-3">
                                {account["username"]}
                            </p>
                            <p className="text-sm font-semibold text-white pb-14">
                                #{account["id"]}
                            </p>
                            <div className="hidden lg:block">
                                <ButtonInventory
                                    selectedItem={"Profile settings"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-full">
                    <div
                        className={
                            isEditingPass
                                ? clsx(
                                      classes?.profileSizePassOpen,
                                      classes?.profilebg,
                                      classes?.profileFont,
                                      "relative"
                                  )
                                : clsx(
                                      classes?.profileSize,
                                      classes?.profilebg,
                                      classes?.profileFont,
                                      "relative"
                                  )
                        }
                    >
                        <div className={clsx(classes?.profileHeader, "")}>
                            Profile settings
                        </div>
                        <div className={clsx(classes?.profileInfo, "")}>
                            <div
                                className={
                                    isEditing
                                        ? "block"
                                        : clsx(classes?.userName, "flex")
                                }
                            >
                                <div
                                    className={clsx(
                                        classes?.layout,
                                        "lg:flex items-center"
                                    )}
                                >
                                    <div
                                        className={clsx(classes?.sizeOfAtb, "")}
                                    >
                                        <span
                                            className={clsx(
                                                classes?.sizeOfAtb,
                                                ""
                                            )}
                                        >
                                            UserName
                                        </span>
                                    </div>

                                    <div>
                                        {isEditing ? (
                                            <div className="hidden lg:block">
                                                <p className="text-red-500">
                                                    {errorChangeUserName}
                                                </p>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        "& > :not(style)": {
                                                            m: 1,
                                                            width: "25ch",
                                                        },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Username"
                                                        variant="outlined"
                                                        value={newUsername}
                                                        onChange={handleChange}
                                                        sx={{
                                                            "& label": {
                                                                color: "#777", // Màu chữ mặc định
                                                            },
                                                            "& fieldset": {
                                                                borderColor:
                                                                    "white", // Màu border mặc định
                                                            },
                                                            "&:focus-within label":
                                                                {
                                                                    color: "white", // Thay đổi màu chữ thành màu xanh khi focus
                                                                    fontSize:
                                                                        "20px",
                                                                },
                                                            "&:focus-within fieldset":
                                                                {
                                                                    borderColor:
                                                                        "#B7A284 !important", // Thay đổi màu border thành màu xanh khi focus
                                                                },
                                                        }}
                                                        InputProps={{
                                                            sx: {
                                                                color: "white", // Thay đổi màu chữ của input thành màu xanh
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </div>
                                        ) : (
                                            <span
                                                className={clsx(classes?.user)}
                                            >
                                                {username}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(classes?.edit, "")}>
                                    {isEditing ? (
                                        <>
                                            <div className="hidden lg:flex flex-row gap-8 mb-4 ml-20 justify-between">
                                                <button
                                                    className={clsx(
                                                        classes?.editBtn
                                                    )}
                                                    onClick={handleSaveClick}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className={clsx(
                                                        classes?.editBtn,
                                                        ""
                                                    )}
                                                    onClick={handleCancelClick}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            className={clsx(
                                                classes?.editBtn,
                                                ""
                                            )}
                                            onClick={handleEditClick}
                                        >
                                            <span
                                                className={clsx(
                                                    classes?.editText,
                                                    ""
                                                )}
                                            >
                                                Edit
                                            </span>
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
                                className="border border-[#574239] hidden lg:block  h-0 w-11/12"
                            >
                                <path d="M0 1H1130.43" stroke="#574239" />
                            </svg>
                            <div className={clsx(classes?.email, "")}>
                                <div
                                    className={clsx(
                                        classes?.layout,
                                        "lg:flex items-center"
                                    )}
                                >
                                    <div
                                        className={clsx(classes?.sizeOfAtb, "")}
                                    >
                                        Email
                                    </div>

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
                                className="border border-[#574239] h-0 w-11/12"
                            >
                                <path d="M0 1H1130.43" stroke="#574239" />
                            </svg>
                            <div
                                className={
                                    isEditingPass
                                        ? "block"
                                        : clsx(classes?.password, "flex mt-6")
                                }
                            >
                                <div
                                    className={clsx(
                                        classes?.passwordSetup,
                                        "flex items-center"
                                    )}
                                >
                                    <div
                                        className={clsx(classes?.sizeOfAtb, "")}
                                    >
                                        <span
                                            className={clsx(
                                                classes?.sizeOfAtb,
                                                ""
                                            )}
                                        >
                                            Password
                                        </span>
                                    </div>
                                    <div className="hidden lg:inline-block">
                                        {isEditingPass ? (
                                            <>
                                                <p className="text-red-500 lg:w-[500px] lg:h-14">
                                                    {erroDiff}
                                                </p>
                                                {Array.isArray(
                                                    errorChangePassword
                                                ) ? (
                                                    errorChangePassword.length >
                                                        0 && (
                                                        <p className="text-red-500 lg:w-[500px] lg:h-20">
                                                            {errorChangePassword.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                )
                                                            )}
                                                        </p>
                                                    )
                                                ) : (
                                                    <p className="text-red-500 h-8">
                                                        {errorChangePassword}
                                                    </p>
                                                )}
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        "& > :not(style)": {
                                                            m: 1,
                                                            width: "25ch",
                                                        },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Old password"
                                                        variant="outlined"
                                                        type="password"
                                                        style={{
                                                            marginTop: "30px",
                                                        }}
                                                        value={oldpassword}
                                                        onChange={
                                                            handleOldPasswordChange
                                                        }
                                                        sx={{
                                                            "& label": {
                                                                color: "gray", // Màu chữ mặc định
                                                            },
                                                            "& fieldset": {
                                                                borderColor:
                                                                    "gray", // Màu border mặc định
                                                            },
                                                            "&:focus-within label":
                                                                {
                                                                    color: "white", // Thay đổi màu chữ thành màu xanh khi focus
                                                                },
                                                            "&:focus-within fieldset":
                                                                {
                                                                    borderColor:
                                                                        "blue", // Thay đổi màu border thành màu xanh khi focus
                                                                },
                                                        }}
                                                        InputProps={{
                                                            sx: {
                                                                color: "white", // Thay đổi màu chữ của input thành màu xanh
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        "& > :not(style)": {
                                                            m: 1,
                                                            width: "25ch",
                                                        },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="New password"
                                                        type="password"
                                                        variant="outlined"
                                                        value={newPassword}
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        sx={{
                                                            "& label": {
                                                                color: "gray", // Màu chữ mặc định
                                                            },
                                                            "& fieldset": {
                                                                borderColor:
                                                                    "gray", // Màu border mặc định
                                                            },
                                                            "&:focus-within label":
                                                                {
                                                                    color: "white", // Thay đổi màu chữ thành màu xanh khi focus
                                                                },
                                                            "&:focus-within fieldset":
                                                                {
                                                                    borderColor:
                                                                        "blue", // Thay đổi màu border thành màu xanh khi focus
                                                                },
                                                        }}
                                                        InputProps={{
                                                            sx: {
                                                                color: "white", // Thay đổi màu chữ của input thành màu xanh
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        "& > :not(style)": {
                                                            m: 1,
                                                            width: "25ch",
                                                        },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Confirm password"
                                                        type="password"
                                                        variant="outlined"
                                                        value={confirmPassword}
                                                        onChange={
                                                            handleConfirmPasswordChange
                                                        }
                                                        sx={{
                                                            "& label": {
                                                                color: "gray", // Màu chữ mặc định
                                                            },
                                                            "& fieldset": {
                                                                borderColor:
                                                                    "gray", // Màu border mặc định
                                                            },
                                                            "&:focus-within label":
                                                                {
                                                                    color: "white", // Thay đổi màu chữ thành màu xanh khi focus
                                                                },
                                                            "&:focus-within fieldset":
                                                                {
                                                                    borderColor:
                                                                        "blue", // Thay đổi màu border thành màu xanh khi focus
                                                                },
                                                        }}
                                                        InputProps={{
                                                            sx: {
                                                                color: "white", // Thay đổi màu chữ của input thành màu xanh
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(classes?.editPass, "")}>
                                    <div
                                        className={clsx(classes?.editPass, "")}
                                    >
                                        {isEditingPass ? (
                                            <>
                                                <div className="hidden lg:flex justify-evenly mt-5 ">
                                                    <button
                                                        className={clsx(
                                                            classes?.editBtn,
                                                            ""
                                                        )}
                                                        onClick={
                                                            handleChangePasswordClick
                                                        }
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className={clsx(
                                                            classes?.editBtn,
                                                            ""
                                                        )}
                                                        onClick={
                                                            handlePassCancelClick
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                className={clsx(
                                                    classes?.editBtn,
                                                    classes?.editspacing,
                                                    classes?.buttoneEdit,
                                                    ""
                                                )}
                                                onClick={handlePassEditClick}
                                            >
                                                <span
                                                    className={clsx(
                                                        classes?.editText
                                                    )}
                                                >
                                                    Edit
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(classes?.balance, "text-red-500")}>
                        <div className={clsx(classes?.headerwallet, "")}>
                            In game Wallet
                        </div>
                        <div className={clsx(classes?.containWallet, "flex ")}>
                            <div
                                className={clsx(classes?.walletLogo, "")}
                            ></div>
                            <div className={clsx(classes?.walletBalanceMB, "")}>
                                <div
                                    className={clsx(
                                        classes?.headerWalletBalance,
                                        ""
                                    )}
                                >
                                    $gKAB
                                </div>
                                <div
                                    className={clsx(classes?.walletBalance, "")}
                                >
                                    {userData
                                        ? userData.balance.toLocaleString()
                                        : 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(classes?.myHeros, "")}>
                        <p className={clsx(classes?.headerHeros, "")}>
                            NFTs Sumary
                        </p>
                        <div className="flex">
                            <div className={clsx(classes?.heroLogo, "")}></div>
                            <div>
                                <div className={clsx(classes?.herosCount, "")}>
                                    Hero Owner: {myHeros.length}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="270"
                                        height="2"
                                        viewBox="0 0 270 2"
                                        fill="none"
                                        className="lg:hidden mt-5"
                                    >
                                        <path
                                            d="M0 1L270 1.00002"
                                            stroke="#463024"
                                        />
                                    </svg>
                                </div>

                                <div className={clsx(classes?.herosCount, "")}>
                                    <div
                                        className={clsx(classes?.countAtb, "")}
                                    >
                                        <span
                                            className={clsx(
                                                classes?.headerAtb,
                                                ""
                                            )}
                                        >
                                            rank
                                        </span>
                                        <span>
                                            Warior:{" "}
                                            {countByAttribute(
                                                "rank",
                                                "WARRIOR"
                                            )}
                                        </span>
                                        <span>
                                            Warmonger:{" "}
                                            {countByAttribute(
                                                "rank",
                                                "WARMONGER"
                                            )}
                                        </span>
                                        <span>
                                            Overseer:{" "}
                                            {countByAttribute(
                                                "rank",
                                                "OVERSEER"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Chieftan:{" "}
                                            {countByAttribute(
                                                "rank",
                                                "CHIEFTAN"
                                            )}{" "}
                                        </span>
                                    </div>
                                    <div
                                        className={clsx(classes?.countAtb, "")}
                                    >
                                        <span
                                            className={clsx(
                                                classes?.headerAtb,
                                                ""
                                            )}
                                        >
                                            Race
                                        </span>
                                        <span>
                                            Antuk:{" "}
                                            {countByAttribute("race", "ANTUK")}{" "}
                                        </span>
                                        <span>
                                            Krakee:{" "}
                                            {countByAttribute("race", "KRAKEE")}{" "}
                                        </span>
                                        <span>
                                            Krakee:{" "}
                                            {countByAttribute("race", "MANTAH")}{" "}
                                        </span>
                                        <span>
                                            Montak:{" "}
                                            {countByAttribute("race", "MONTAK")}{" "}
                                        </span>
                                        <span>
                                            Muu:{" "}
                                            {countByAttribute("race", "MUU")}{" "}
                                        </span>
                                    </div>
                                    <div
                                        className={clsx(classes?.countAtb, "")}
                                    >
                                        <span
                                            className={clsx(
                                                classes?.headerAtb,
                                                ""
                                            )}
                                        >
                                            Class
                                        </span>
                                        <span>
                                            Air:{" "}
                                            {countByAttribute("class", "AIR")}{" "}
                                        </span>
                                        <span>
                                            Mage:{" "}
                                            {countByAttribute("class", "MAGE")}{" "}
                                        </span>
                                        <span>
                                            Melee:{" "}
                                            {countByAttribute("class", "MELEE")}
                                        </span>
                                        <span>
                                            Range:{" "}
                                            {countByAttribute("class", "RANGE")}{" "}
                                        </span>
                                        <span>
                                            Tanker:{" "}
                                            {countByAttribute(
                                                "class",
                                                "TANKER"
                                            )}{" "}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                {!shouldHideModal && (
                    <BasicModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        style={{ height: "70%" }}
                        modalContent={
                            <ChangeUserName
                                value={newUsername}
                                onChange={handleChange}
                                onClick={handleSaveClick}
                            />
                        }
                    />
                )}
            </div>

            <div>
                {!shouldHideModal && (
                    <BasicModal
                        open={isModalOpenPassword}
                        onClose={handeleCloseModalPassword}
                        modalContent={
                            <ChangePassword
                                valueConfirm={confirmPassword}
                                onChangeConfirm={handleConfirmPasswordChange}
                                valueNewPass={newPassword}
                                onChangeNewPass={handlePasswordChange}
                                valueOldPass={oldpassword}
                                onChangeOldPass={handleOldPasswordChange}
                                onClick={handleChangePasswordClick}
                            />
                        }
                        style={{ height: "70%" }}
                    />
                )}
            </div>
        </div>
    );
};
