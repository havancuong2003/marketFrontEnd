import React, { useState } from "react";
import clsx from "clsx";
import avatar from "../../../assets/img/avatar.png";
import okg_token from "../../../assets/img/OKGToken.png";
import x_button from "../../../assets/img/xbutton.png";
import { Hero } from "../../../models/hero";
import { handleSelling } from "../../common";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

type SellHeroProps = {
    classes?: {
        [key: string]: string;
    };
    hero: Hero;
    onClickX: () => void;
    onClickSell: () => void;
};
export const SellHero: React.FC<SellHeroProps> = ({
    classes,
    hero,
    onClickX,
    onClickSell,
}) => {
    const [errorPrice, setErrorPrice] = useState("");
    const [price, setPrice] = useState(0);
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const cleanValue = inputValue.replace(/,/g, "");

        console.log(cleanValue);
        console.log(inputValue);
        if (cleanValue === "") {
            setErrorPrice("Prize is required");
        } else if (isNaN(Number(cleanValue))) {
            setErrorPrice("Must be a number");
        } else if (Number(cleanValue) < 0) {
            setErrorPrice("Prize must be positive");
        } else {
            setErrorPrice("");
        }

        setPrice(cleanValue);
    };

    const handleSubmit = async (price, id: number) => {
        if (errorPrice !== "") {
            return;
        }
        try {
            Swal.fire({
                title: "SELLING ITEM?",
                text: "This item will be instantly listed on the marketplace",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleSelling(price, id);
                    onClickSell();
                }
            });
        } catch (error) {
            console.log("error selling", error);
        }
    };

    return (
        <div
            className={clsx(
                classes?.container,
                "bg-cover bg-center absolute top-40 text-main"
            )}
        >
            <div className="absolute top-0 right-0">
                <img src={x_button} alt="" onClick={onClickX}></img>
            </div>
            <div className="flex justify-center text-3xl  mb-8 font-Skranji">
                <span>LISTING ITEM</span>
            </div>
            <div
                className={clsx(
                    classes?.center,
                    "bg-brown-op rounded-lg  flex "
                )}
            >
                <div className="w-1/2 flex justify-center items-center">
                    <img
                        src={avatar}
                        className={clsx(classes?.avatar, "rounded-md")}
                        alt=""
                    />
                </div>
                <div className="w-1/2 grid grid-rows-2 mt-7 pr-10">
                    <div className=" row-span-1">
                        <span>{hero.name}</span>
                        <div className="mt-3">
                            <span>ID:</span> <span>{hero.id}</span>
                        </div>
                        <div className="mt-3">
                            <span>Owner:</span> <span>{hero.account_id}</span>
                        </div>
                        <br />
                    </div>
                    <div className="my-10 row-span-1 ">
                        <div className="flex justify-between text-xl">
                            <span>Input price</span>
                            {errorPrice && (
                                <span className="text-red-500">
                                    {errorPrice}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-between items-center relative">
                            {/* <input
                                className={clsx(
                                    classes?.input,
                                    "bg-light-brown rounded-md text-my-brown text-xl font-bold my-2 pl-3 "
                                )}
                                type="text"
                                value={price}
                                onChange={handleInputChange}
                            /> */}
                            <NumericFormat
                                value={price}
                                onChange={handleInputChange}
                                thousandSeparator
                                className={clsx(
                                    classes?.input,
                                    "bg-light-brown rounded-md text-my-brown text-xl font-black my-2 pl-3 "
                                )}
                            ></NumericFormat>
                            <div className="flex items-center absolute right-2 text-my-brown text-xl font-semibold">
                                <img src={okg_token} alt="" className="mr-1" />
                                <span>OKG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center h-1/4">
                <div
                    className={clsx(
                        classes?.button,
                        "bg-yellow_l flex justify-center items-center text-xl"
                    )}
                >
                    <button
                        className="w-full h-full cursor-pointer font-Skranji"
                        onClick={() => {
                            handleSubmit(price, hero.id);
                        }}
                    >
                        START LISTING
                    </button>
                </div>
            </div>
        </div>
    );
};
