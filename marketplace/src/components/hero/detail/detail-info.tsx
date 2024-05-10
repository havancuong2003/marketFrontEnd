import okg_token from "../../../assets/img/OKGToken.png";
import atk from "../../../assets/img/ATK.png";
import atk_speed from "../../../assets/img/ATK Speed.png";
import hp from "../../../assets/img/HP.png";
import dps from "../../../assets/img/DPS.png";
import { useNavigate } from "react-router-dom";
import { ShortId } from "../../../services";
import { unListHero } from "../../common/activity-hero";
import { isAuthenticated } from "../../../utils";
import { Hero } from "../../../models/hero";
import clsx from "clsx";
import { useAccountInformation } from "../../../hooks";
import img_copy from "../../../assets/img/copy_1.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
import { CopyText } from "../../common";

type DetailInfoProps = {
    classes?: {
        [key: string]: string;
    };
    hero: Hero;
    onClickBuy: () => void;
    onClickSell: (id: number) => void;
};

export const DetailInfo: React.FC<DetailInfoProps> = ({
    classes,
    hero,
    onClickBuy,
    onClickSell,
}) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const navigate = useNavigate();

    const handelUnList = async (id: number) => {
        Swal.fire({
            title: "DELIST ITEM?",
            text: "This item will be instantly REMOVED from Marketplace and return to your Inventory",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "DELISTED!",
                    text: "Your hero had been delisted",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                unListHero(id);
                navigate("/");
            }
        });
    };

    const { account } = useAccountInformation() as unknown as {
        account: Account;
    };

    return (
        <div className={clsx(classes?.container)}>
            <div className={clsx(classes?.hero_info, "text-main ")}>
                <div className={clsx(classes?.hero_name, "flex items-center ")}>
                    <span className="ml-4 font-bold text-2xl">
                        {" "}
                        {hero.name}
                    </span>
                </div>
                <div className={clsx(classes?.heroId_onwner)}>
                    <div
                        className={clsx(
                            classes?.heroId_onwner_detail,
                            "flex items-center relative"
                        )}
                    >
                        <div className="ml-4 text-s flex items-center ">
                            <div>
                                <span>ID: </span>
                                <Tooltip title={hero.id} placement="top" arrow>
                                    <span className="truncate">{hero.id}</span>
                                </Tooltip>
                            </div>
                            <div className="right-0 rounded-md absolute">
                                <CopyText text={hero.id} />
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx(
                            classes?.heroId_onwner_detail,
                            "flex items-center relative"
                        )}
                    >
                        <div className="ml-4 text-s flex items-center ">
                            <div>
                                <span>Owner: </span>
                                <Tooltip
                                    title={hero.account_id}
                                    placement="top"
                                    arrow
                                >
                                    <span className="truncate">
                                        {ShortId(hero.account_id)}
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="right-0 rounded-md absolute">
                                <CopyText text={hero.account_id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className={clsx(classes?.container_price, "my-5 h-11%")}> */}
            <div
                className={clsx(
                    classes?.container_price,
                    hero.status ? "relative" : "justify-center"
                )}
            >
                <div
                    className={clsx(
                        classes?.price,
                        "bg-brown-black rounded-md opacity-80  bg-cover h-14  flex items-center",
                        hero.status ? "" : "hidden"
                    )}
                >
                    <div className="ml-4 text-main flex items-center">
                        <img src={okg_token} alt=""></img>
                        <span className="ml-2 font-medium text-3xl">
                            <NumericFormat
                                value={hero.price}
                                displayType="text"
                                thousandSeparator={","}
                            />
                        </span>
                    </div>
                </div>
                <div
                    className={clsx(
                        classes?.action,
                        "  ",
                        hero.status ? " absolute right-0" : "w-96"
                    )}
                >
                    {isAuthenticated() ? (
                        account.id === hero.account_id ? (
                            hero.status ? (
                                <div
                                    className={clsx(
                                        classes?.delist_bt,
                                        "h-2/3 pt-3 "
                                    )}
                                >
                                    <div
                                        className="bg-brown-black bg-cover flex items-center justify-center cursor-pointer border-solid border-2 border-lime-50 rounded-xl "
                                        onClick={() => handelUnList(hero.id)}
                                    >
                                        <span className="text-main text-2xl font-medium ">
                                            Delist
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <div
                                        className={clsx(
                                            classes?.sell_bt,
                                            "bg-yellow_l bg-cover flex items-center justify-center cursor-pointer "
                                        )}
                                        onClick={() => onClickSell(hero.id)}
                                    >
                                        <span
                                            className={clsx(
                                                classes?.action,
                                                "text-main text-2xl font-medium font-Skranji"
                                            )}
                                        >
                                            SELL HERO
                                        </span>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div
                                className={clsx(
                                    classes?.buy_bt,
                                    " bg-cover flex items-center justify-center cursor-pointer "
                                )}
                                onClick={onClickBuy}
                            >
                                <span
                                    className={clsx(
                                        classes?.action,
                                        "text-main font-medium font-Skranji flex items-center justify-center"
                                    )}
                                >
                                    BUY NOW
                                </span>
                            </div>
                        )
                    ) : (
                        <div
                            className={clsx(
                                classes?.buy_bt,
                                " bg-cover flex items-center justify-center cursor-pointer "
                            )}
                            onClick={() => navigate("/login")}
                        >
                            <span
                                className={clsx(
                                    classes?.action,
                                    "text-main font-medium font-Skranji flex items-center justify-center"
                                )}
                            >
                                BUY NOW
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {/* </div> */}

            <div
                className={clsx(
                    classes?.stats,
                    "bg-brown-black rounded-xl opacity-80 bg-cover  relative"
                )}
            >
                <div className="text-main p-3 ">
                    <div className={clsx(classes?.stats_title, "mb-5 ml")}>
                        <span className="text-xl font-bold">HERO STATS</span>
                    </div>
                    {/* <div className={clsx(classes?.stats_content, " ")}> */}
                    <div
                        className={clsx(
                            classes?.stats_content,
                            "justify-between items-center pt-3.5"
                        )}
                    >
                        <div className={clsx(classes?.stats_power)}>
                            <span className="text-base  text-light-brown">
                                Combat power (CP)
                            </span>
                            <br />
                            <span className="text-xl font-bold">
                                <NumericFormat
                                    value={hero.power}
                                    thousandSeparator=","
                                    displayType="text"
                                />
                            </span>
                        </div>
                        <div className={clsx(classes?.stats_properties)}>
                            <div className="mx-10">
                                <div>
                                    <span className="text-sm  text-light-brown">
                                        Health (HP)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <img src={hp} className="mr-2" />
                                    <span className="text-xl font-semibold">
                                        <NumericFormat
                                            value={hero.hp}
                                            thousandSeparator=","
                                            displayType="text"
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="mx-10">
                                <div>
                                    <span className="text-sm text-light-brown">
                                        Attack (ATK)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <img src={atk} className="mr-2" />
                                    <span className="text-xl font-semibold">
                                        <NumericFormat
                                            value={hero.power}
                                            thousandSeparator=","
                                            displayType="text"
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="mx-10">
                                <div>
                                    <span className="text-sm  text-light-brown">
                                        Speed (SPD)
                                    </span>
                                </div>
                                <div className="flex  items-center">
                                    <img src={atk_speed} className="mr-2" />
                                    <span className="text-xl font-semibold">
                                        <NumericFormat
                                            value={hero.speed}
                                            thousandSeparator=","
                                            displayType="text"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="mx-10">
                                <div>
                                    <span className="text-sm  text-light-brown">
                                        DPS
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <img src={dps} className="mr-2" />
                                    <span className="text-xl font-semibold">
                                        <NumericFormat
                                            value={hero.dps}
                                            thousandSeparator=","
                                            displayType="text"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={clsx(
                            classes?.stats_content_responsive,
                            "justify-between items-center"
                        )}
                    >
                        <div className={clsx(classes?.stats_power)}>
                            <span className="text-base font-bold  text-light-brown">
                                Combat power:&nbsp;
                            </span>
                            <span className="text-xl font-bold">
                                <NumericFormat
                                    value={hero.power}
                                    thousandSeparator=","
                                    displayType="text"
                                />
                            </span>
                        </div>
                        <div className={clsx(classes?.stats_properties)}>
                            <table className="w-full">
                                <tr>
                                    <td className="w-1/2">
                                        <div className="mx-5 text-xl font-thin">
                                            <div>
                                                <img
                                                    src={hp}
                                                    className="mr-2"
                                                />
                                                <span className=" text-light-brown">
                                                    Health:&nbsp;
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="">
                                                    <NumericFormat
                                                        value={hero.hp}
                                                        thousandSeparator=","
                                                        displayType="text"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-1/2">
                                        <div className="mx-5 text-xl font-thin">
                                            <div>
                                                <img
                                                    src={atk}
                                                    className="mr-2"
                                                />
                                                <span className=" text-light-brown">
                                                    Attack:&nbsp;
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="t">
                                                    <NumericFormat
                                                        value={hero.power}
                                                        thousandSeparator=","
                                                        displayType="text"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/2">
                                        <div className="mx-5 text-xl font-thin">
                                            <div>
                                                <img
                                                    src={atk_speed}
                                                    className="mr-2"
                                                />
                                                <span className=" text-light-brown">
                                                    Speed:&nbsp;
                                                </span>
                                            </div>
                                            <div className="flex  items-center">
                                                <span className="">
                                                    <NumericFormat
                                                        value={hero.speed}
                                                        thousandSeparator=","
                                                        displayType="text"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="w-1/2">
                                        <div className="mx-5 text-xl font-thin">
                                            <div>
                                                <img
                                                    src={dps}
                                                    className="mr-2"
                                                />
                                                <span className="  text-light-brown">
                                                    DPS:&nbsp;
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="">
                                                    <NumericFormat
                                                        value={hero.dps}
                                                        thousandSeparator=","
                                                        displayType="text"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};
