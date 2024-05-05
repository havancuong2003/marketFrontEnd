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
    const [copyAccount, setCopyAccount] = useState(false);
    const [copyHero, setCopyHero] = useState(false);

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

    const { account } = useAccountInformation();
    console.log("acopunt", account);
    return (
        <div className="container ">
            <div className="text-main h-1/6">
                <div className="bg-my-brown rounded-md bg-cover h-43% flex items-center">
                    <span className="ml-4 font-bold text-2xl">
                        {" "}
                        {hero.name}
                    </span>
                </div>
                <div className="flex h-29% justify-between mt-5 ">
                    <div className="bg-my-brown rounded-md bg-cover w-48% flex items-center relative">
                        <div className="ml-4 text-s flex items-center ">
                            <div>
                                <span>ID: </span>
                                <Tooltip title={hero.id} placement="top" arrow>
                                    <span className="truncate">{hero.id}</span>
                                </Tooltip>
                            </div>
                            <div className="right-0 rounded-md absolute">
                                {/* <CopyToClipboard
                                    text={hero.id}
                                    onCopy={() => {
                                        setCopyHero(true);
                                        setCopyAccount(false);
                                    }}
                                >
                                    <Tooltip
                                        title={copyHero ? "copied" : "copy"}
                                        placement="top"
                                    >
                                        <Button>
                                            <img
                                                src={img_copy}
                                                className=" w-2/5"
                                            />
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard> */}
                                <CopyText text={hero.id} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-my-brown rounded-md bg-cover w-48% flex items-center relative">
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
                                {/* <CopyToClipboard
                                    text={hero.account_id}
                                    onCopy={() => {
                                        setCopyAccount(true);
                                        setCopyHero(false);
                                    }}
                                >
                                    <Tooltip
                                        title={copyAccount ? "copied" : "copy"}
                                        placement="top"
                                    >
                                        <Button>
                                            <img
                                                src={img_copy}
                                                className=" w-2/5"
                                            />
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard> */}
                                <CopyText text={hero.account_id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-5 h-11%">
                <div
                    className={clsx(
                        classes?.container_price,
                        "flex h-full ",
                        hero.status ? "relative" : "justify-center mr-60"
                    )}
                >
                    <div
                        className={clsx(
                            classes?.price,
                            "bg-brown-black rounded-md opacity-80  bg-cover w-full h-14  flex items-center",
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
                            "  w-1/3 h-90% ",
                            hero.status ? "absolute -right-10" : ""
                        )}
                    >
                        {isAuthenticated() ? (
                            account.id === hero.account_id ? (
                                hero.status ? (
                                    <div className=" w-2/3 h-2/3 pt-3 ">
                                        <div
                                            className="bg-brown-black bg-cover flex items-center justify-center cursor-pointer border-solid border-2 border-lime-50 rounded-xl "
                                            onClick={() =>
                                                handelUnList(hero.id)
                                            }
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
                                    className="bg-yellow_m_button bg-cover flex items-center justify-center cursor-pointer w-[250px] h-[60px] absolute left-0"
                                    onClick={onClickBuy}
                                >
                                    <span
                                        className={clsx(
                                            classes?.action,
                                            "text-main text-2xl font-medium font-Skranji"
                                        )}
                                    >
                                        BUY NOW
                                    </span>
                                </div>
                            )
                        ) : (
                            <div
                                className="bg-yellow_m_button bg-cover h-full flex items-center justify-center cursor-pointer "
                                onClick={() => navigate("/login")}
                            >
                                <span
                                    className={clsx(
                                        classes?.action,
                                        "text-main text-2xl font-medium font-Skranji"
                                    )}
                                >
                                    BUY NOW
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-brown-black rounded-xl opacity-80 bg-cover  relative">
                <div className="text-main p-3 ">
                    <div className="mb-5 ml">
                        <span className="text-xl font-bold">HERO STATS</span>
                    </div>
                    <div className="">
                        <div className="flex justify-between items-center pt-3.5">
                            <div className="">
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
                            <div className="flex ">
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
                    </div>
                </div>
            </div>
        </div>
    );
};
