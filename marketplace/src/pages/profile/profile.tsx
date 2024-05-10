import clsx from "clsx";
import { Header } from "../../components";

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
    const [oldpassword] = useState("");

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
                setErrorChangePassword(error.response?.data.message);
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
            console.log(response.data, "data here");
            console.log(response, " response here");
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

    return (
        <div className="">
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
                            <ButtonInventory
                                selectedItem={"Profile settings"}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full ml-10">
                    <div
                        className={clsx(
                            classes?.profileSize,
                            classes?.profilebg,
                            classes?.profileFont,
                            ""
                        )}
                    >
                        <div className={clsx(classes?.profileHeader, "")}>
                            Profile settings
                        </div>
                        <div className={clsx(classes?.profileInfo, "")}>
                            <div className={clsx(classes?.userName, "")}>
                                <div className={clsx(classes?.layout, "flex")}>
                                    <div
                                        className={clsx(classes?.sizeOfAtb, "")}
                                    >
                                        Username
                                    </div>

                                    <span>
                                        {isEditing ? (
                                            <>
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
                                            <span>{username}</span>
                                        )}
                                    </span>
                                </div>

                                <div className={clsx(classes?.edit, "")}>
                                    {isEditing ? (
                                        <>
                                            <button
                                                className={clsx(
                                                    classes?.editBtn,
                                                    ""
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
                                        </>
                                    ) : (
                                        <button
                                            className={clsx(
                                                classes?.editBtn,
                                                ""
                                            )}
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
                                className="border border-[#574239] h-0 w-full"
                            >
                                <path d="M0 1H1130.43" stroke="#574239" />
                            </svg>
                            <div className={clsx(classes?.email, "")}>
                                <div className="flex">
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
                                className="border border-[#574239] h-0 w-full"
                            >
                                <path d="M0 1H1130.43" stroke="#574239" />
                            </svg>
                            <div className={clsx(classes?.password, "")}>
                                <div className={clsx(classes?.layout, "flex")}>
                                    <div
                                        className={clsx(classes?.sizeOfAtb, "")}
                                    >
                                        Password
                                    </div>
                                    <span>
                                        {isEditingPass ? (
                                            <>
                                                <p className="text-red-500">
                                                    {erroDiff}
                                                </p>
                                                {Array.isArray(
                                                    errorChangePassword
                                                ) ? (
                                                    errorChangePassword.length >
                                                        0 && (
                                                        <p className="text-red-500">
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
                                                    <p className="text-red-500">
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
                                                <label htmlFor="confirm">
                                                    Confirm password
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        id="confirm"
                                                        onChange={
                                                            handleConfirmPasswordChange
                                                        }
                                                        className="text-base text-black p-1 my-2"
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
                                            </>
                                        ) : (
                                            <button
                                                className={clsx(
                                                    classes?.editBtn,
                                                    classes?.editspacing,
                                                    ""
                                                )}
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
                    <div className={clsx(classes?.balance, "text-red-500")}>
                        <div className={clsx(classes?.headerwallet, "")}>
                            In game Wallet
                        </div>
                        <div className={clsx(classes?.containWallet, "flex ")}>
                            <div
                                className={clsx(classes?.walletLogo, "")}
                            ></div>
                            <div>
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
        </div>
    );
};
