import clsx from "clsx";
import { Header } from "../../components";

import { useEffect, useState } from "react";
import { getInfoUser } from "../../services";
import axios, { AxiosError } from "axios";
import { useInventory } from "../../hooks";
import { VITE_API_URL } from "../../env";
type ProfileProps = {
    classes?: {
        [key: string]: string;
    };
};
function countByAttribute(myHeros, attribute, value) {
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
export const Profile: React.FC<ProfileProps> = ({ classes }) => {
    const [myHeros, setMyHeros] = useState<any>([]);
    const { inventory } = useInventory();

    useEffect(() => {
        if (Array.isArray(inventory)) {
            console.log("inventory arr", inventory);
        } else if (typeof inventory === "object" && inventory !== null) {
            // Xác định kiểu cho 'inventory' như là một đối tượng với kiểu dữ liệu cụ thể
            const inventoryObject = inventory as { data: any[] };
            setMyHeros(inventoryObject.data);
        }
    }, [inventory]);

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
                VITE_API_URL + "/api/v1/account/update-username",
                {
                    username: newUsername,
                }
            );
            console.log("Response:", response.data);

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

    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="flex">
                <div className={clsx(classes?.container, "border")}>
                    Khung chua 3 button inventory activities profile setting
                </div>
                <div className=" `">
                    <div
                        className={clsx(
                            classes?.profileSize,
                            classes?.profilebg,
                            classes?.profileFont,
                            "border"
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
                                className="border border-[#574239] h-0"
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
                                className="border border-[#574239] h-0"
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
                                                <label htmlFor="oldpassword">
                                                    Old Password
                                                    <input
                                                        type="password"
                                                        value={oldpassword}
                                                        onChange={
                                                            handleOldPasswordChange
                                                        }
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
                                                        onChange={
                                                            handlePasswordChange
                                                        }
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
                                                        onChange={
                                                            handleConfirmPasswordChange
                                                        }
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
                                    Hero Owner: 200
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
                                                myHeros,
                                                "rank",
                                                "WARRIOR"
                                            )}
                                        </span>
                                        <span>
                                            Warmonger:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "rank",
                                                "WARMONGER"
                                            )}
                                        </span>
                                        <span>
                                            Overseer:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "rank",
                                                "OVERSEER"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Chieftan:{" "}
                                            {countByAttribute(
                                                myHeros,
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
                                            {countByAttribute(
                                                myHeros,
                                                "race",
                                                "ANTUK"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Krakee:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "race",
                                                "KRAKEE"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Krakee:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "race",
                                                "MANTAH"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Montak:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "race",
                                                "MONTAK"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Muu:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "race",
                                                "MUU"
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
                                            Class
                                        </span>
                                        <span>
                                            Air:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "class",
                                                "AIR"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Mage:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "class",
                                                "MAGE"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Melee:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "class",
                                                "MELEE"
                                            )}
                                        </span>
                                        <span>
                                            Range:{" "}
                                            {countByAttribute(
                                                myHeros,
                                                "class",
                                                "RANGE"
                                            )}{" "}
                                        </span>
                                        <span>
                                            Tanker:{" "}
                                            {countByAttribute(
                                                myHeros,
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
