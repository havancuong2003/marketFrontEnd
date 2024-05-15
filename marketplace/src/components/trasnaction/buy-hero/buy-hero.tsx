import React, { useState } from "react";
import clsx from "clsx";
import avatar from "../../../assets/img/avatar.png";
import okg_token from "../../../assets/img/OKGToken.png";
import x_button from "../../../assets/img/xbutton.png";
import { Hero } from "../../../models/hero";
import { buyHero, CopyText } from "../../common";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
import { ShortId } from "../../../services";
type BuyHeroProps = {
    classes?: {
        [key: string]: string;
    };
    hero: Hero;
    onClickX: () => void;
    onClickPay: () => void;
    send: (val: string) => void;
};
export const BuyHero: React.FC<BuyHeroProps> = ({
    classes,
    hero,
    onClickX,
    onClickPay,
    send,
}) => {
    const [error, setError] = useState("");
    const handleCheckOut = async (id: number) => {
        Swal.fire({
            title: "PURCHASING ITEM?",
            text: "Do you want to purchase this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                buyHero(id, { send }).then((response) => {
                    const { error } = response;
                    setError(error);
                    if (!error) {
                        onClickPay();
                    }
                });
            }
        });
    };

    return (
        <div
            className={clsx(classes?.container, "bg-cover bg-center absolute ")}
        >
            <div
                className={clsx(
                    classes?.x_button,
                    "absolute top-0 right-0 cursor-pointer"
                )}
            >
                <img src={x_button} alt="" onClick={onClickX}></img>
            </div>
            <div
                className={clsx(
                    classes?.container_text,
                    "flex justify-center font-bold"
                )}
            >
                <span>PURCHASING ITEM</span>
            </div>
            <div
                className={clsx(
                    classes?.center,
                    "bg-brown-op rounded-lg  flex "
                )}
            >
                <div
                    className={clsx(
                        classes?.avatar_container,
                        " flex justify-center "
                    )}
                >
                    <img
                        src={avatar}
                        className={clsx(classes?.avatar, "rounded-md")}
                        alt=""
                    />
                </div>
                <div
                    className={clsx(
                        classes?.info_container,
                        " grid grid-rows-3 relative"
                    )}
                >
                    <div className={clsx(classes?.info, "")}>
                        <span>{hero.name}</span>
                        <hr />
                        <div className={clsx(classes?.rank)}>
                            <span>Rank: </span>
                            <span className="text-green-700">{hero.rank}</span>
                        </div>
                        <div className={clsx(classes?.id)}>
                            <span>ID:</span> <span>{hero.id}</span>
                        </div>
                        <div className={clsx(classes?.owner)}>
                            <span>Owner: </span>
                            <span>
                                {ShortId(hero.account_id)}
                                {CopyText(hero.account_id)}
                            </span>
                        </div>
                        <br />
                    </div>
                    <div
                        className={clsx(classes?.amount, "my-10 row-span-1  ")}
                    >
                        <div className="flex justify-between">
                            <span>Total amount</span>
                            {error && (
                                <span className="text-red-500">{error}</span>
                            )}
                        </div>

                        <hr />
                        <div
                            className={clsx(
                                classes?.price,
                                "flex justify-between items-center "
                            )}
                        >
                            <span className="font-bold  ">
                                <NumericFormat
                                    value={hero.price}
                                    displayType="text"
                                    thousandSeparator={","}
                                ></NumericFormat>
                            </span>
                            <div
                                className={clsx(
                                    classes?.token,
                                    "flex items-center "
                                )}
                            >
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
                        "flex justify-center items-center font-bold"
                    )}
                    onClick={() => handleCheckOut(hero.id)}
                >
                    <span>CHECK OUT </span>
                </div>
            </div>
        </div>
    );
};
