import React from "react";
import clsx from "clsx";
import arrow from "../../../assets/img/arrow_2.png";
import { useNavigate } from "react-router-dom";

type ListingProps = {
    classes?: {
        [key: string]: string;
    };
};

export const ListingSucceeded: React.FC<ListingProps> = ({ classes }) => {
    const navigate = useNavigate();

    return (
        <div
            className={clsx(
                classes?.container,
                "bg-cover bg-center absolute top-56 flex justify-center items-center text-main font-Avenir"
            )}
        >
            <div className=" ">
                <div className="flex justify-center py-5">
                    <img src={arrow} alt="" className={classes?.arrow}></img>
                </div>
                <div
                    className={clsx(
                        classes?.text,
                        "flex justify-center font-Skranji"
                    )}
                >
                    <span>LISTING COMPLETE</span>
                </div>
                <div className={clsx(classes?.message, "flex ")}>
                    <span>Your item is now on the top of Marketplace.</span>
                </div>
                <div className={clsx(classes?.button)}>
                    <div
                        className={clsx(
                            classes?.view_item,
                            "flex justify-center items-center font-Skranji"
                        )}
                        onClick={() => navigate("/inventory")}
                    >
                        <span>VIEW ITEM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
