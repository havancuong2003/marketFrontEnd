import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import { isAuthenticated } from "../../../utils/is-authenticated";
import clsx from "clsx";

export const Header = (props) => {
    const { classes }: any = props;
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleItemClick = (path) => {
        navigate("/" + path);
        setShowMenu(false);
    };

    return (
        <>
            <nav
                className={clsx(
                    classes.container,
                    " bg-[#3C2C19] text-white lg:flex lg:justify-between lg:items-center "
                )}
            >
                <div className="flex items-center">
                    <img
                        className={clsx(
                            classes?.logoResponsive,
                            " lg:ml-24 cursor-pointer"
                        )}
                        src={logo}
                        alt="logo"
                        onClick={() => navigate("/")}
                    />
                    <div className={clsx(classes.navheader, "")}>
                        <button
                            className={clsx(classes.clickbutton, "")}
                            onClick={() => handleItemClick("")}
                        >
                            Market Place
                        </button>
                    </div>
                    <div className={clsx(classes.navheader, "")}>
                        <button
                            className={clsx(classes.clickbutton, "")}
                            onClick={() => navigate("/inventory")}
                        >
                            Inventory
                        </button>
                    </div>
                </div>
                <div className={clsx(classes.navheader, "")}>
                    {isAuthenticated() ? (
                        <button
                            className={clsx(
                                classes.clickbutton,
                                "lg:w-52 h-10 cursor-pointer hover:bg-violet-600 rounded-lg  active:bg-violet-700   border  text-center"
                            )}
                            onClick={() => navigate("/profile")}
                        >
                            Profile
                        </button>
                    ) : (
                        <button
                            className={clsx(
                                classes.clickbutton,
                                classes.buttonProf,
                                " "
                            )}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    )}
                    <button
                        className={clsx(
                            classes.clickbutton,
                            classes.buttonProf,
                            classes.buttonProf2,
                            "text-center"
                        )}
                        onClick={() =>
                            isAuthenticated()
                                ? handleLogout()
                                : navigate("/register")
                        }
                    >
                        {isAuthenticated() ? "Logout" : "Register"}
                    </button>
                </div>
                <div className="lg:hidden ">
                    <button
                        className={clsx(
                            classes.sizenav,
                            "cursor-pointer bg-nav"
                        )}
                        onClick={toggleMenu}
                    ></button>
                </div>
            </nav>
            {showMenu && (
                <div className="border border-red-800 top-0 left-0 flex-shrink-0  fixed z-40 h-screen w-full">
                    <div
                        className={clsx(
                            classes.bgopa,
                            " p-2 rounded-md shadow-md h-screen"
                        )}
                    >
                        <button
                            onClick={() => setShowMenu(false)}
                            className="fixed top-5 right-5 z-50 text-white text-4xl"
                        >
                            X
                        </button>
                        <div className="flex flex-col justify-center items-center text-white h-screen text-3xl space-y-4">
                            <button
                                className="cursor-pointer block  p-1 rounded-md active:bg-red-900"
                                onClick={() => handleItemClick("")}
                            >
                                Market Place
                            </button>
                            <button
                                className="cursor-pointer  p-1 rounded-md active:bg-red-900 "
                                onClick={() => handleItemClick("inventory")}
                            >
                                Inventory
                            </button>
                            <button
                                className="cursor-pointer  p-1 rounded-md active:bg-red-900"
                                // onClick={() =>
                                //     handleItemClick(
                                //         isAuthenticated()
                                //             ? "/profile"
                                //             : "/login"
                                //     )
                                // }
                                onClick={() => navigate("/profile")}
                            >
                                {isAuthenticated() ? "Profile" : "Login"}
                            </button>
                            <button
                                className="cursor-pointer  p-1 rounded-md active:bg-red-900"
                                onClick={() =>
                                    isAuthenticated()
                                        ? handleLogout()
                                        : navigate("/register")
                                }
                            >
                                {isAuthenticated() ? "Logout" : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
