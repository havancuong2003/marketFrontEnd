import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import clsx from "clsx";
type ButtonStartProps = {
    component: React.ReactNode;
    p: string;
    classes?: {
        [key: string]: string;
    };
};
export const StartPage: React.FC<ButtonStartProps> = ({
    component,
    p,
    classes,
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    });
    return (
        <div className="h-screen w-[414px] lg:w-full flex justify-center items-center rounded-lg bg-bglogin bg-cover bg-center">
            <div
                className={clsx(
                    classes?.sizePage,
                    classes?.bgSize,
                    " flex justify-center relative "
                )}
            >
                <div
                    className={clsx(
                        classes?.sizeClose,
                        " lg:absolute lg:top-0 lg:right-0 cursor-pointer"
                    )}
                    onClick={() => navigate("/auth")}
                ></div>
                <div
                    className={clsx(
                        classes?.sizeDiv,
                        "relative top-36 lg:top-16 "
                    )}
                >
                    <h1 className="text-white text-sm lg:text-3xl font-bold lg:my-3 text-center">
                        YOU ARE ALMOST THERE!
                    </h1>
                    <p className="text-white text-xs lg:text-lg text-center">
                        {p}
                    </p>
                    {component}
                </div>
            </div>
        </div>
    );
};
