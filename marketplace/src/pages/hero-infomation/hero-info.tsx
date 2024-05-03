import { DetailInfo, Header, HistoryTrans, InfoHero } from "../../components";
import { useHeroDetail } from "../../hooks/use-hero-info";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import footer from "../../assets/img/Footer.png";
import clsx from "clsx";

import {
    BuyHero,
    PaySucceeded,
    SellHero,
    ListingSucceeded,
} from "../../components/trasnaction";
import { ButtonBack } from "../../components/";
import { Button, Tooltip } from "@mui/material";
type HeroDetailProps = {
    classes?: {
        [key: string]: string;
    };
};
export const HeroDetail: React.FC<HeroDetailProps> = ({ classes }) => {
    const hero = useHeroDetail();
    const navigate = useNavigate();

    const [showHistory, setShowHistory] = useState(false);
    const [showBuy, setShowBuy] = useState(false);
    const [showSell, setShowSell] = useState(false);
    const [isPay, setIsPay] = useState(false);
    const [isSell, setIsSell] = useState(false);

    const toggleHistory = () => {
        if (showBuy || showSell) return;
        setShowHistory(!showHistory);
    };

    const handleBuyHero = () => {
        setShowBuy(!showBuy);
    };
    const handleSellHero = () => {
        setShowSell(!showSell);
    };

    const isBlur = () => {
        if (showBuy || showSell) {
            return "blur-sm";
        }
    };

    const handlePay = () => {
        setIsPay(true);
    };

    const handleSell = () => {
        setIsSell(true);
    };

    return (
        <>
            {showBuy && !isPay && (
                <div className=" flex justify-center relative">
                    <BuyHero
                        hero={hero}
                        onClickX={handleBuyHero}
                        onClickPay={handlePay}
                    />
                </div>
            )}

            {isPay && (
                <div className=" flex justify-center relative items-center ">
                    <PaySucceeded />
                </div>
            )}

            {showSell && !isSell && (
                <div className=" flex justify-center relative items-center ">
                    <SellHero
                        hero={hero}
                        onClickX={handleSellHero}
                        onClickSell={handleSell}
                    />
                </div>
            )}

            {isSell && (
                <div className=" flex justify-center relative items-center ">
                    <ListingSucceeded />
                </div>
            )}

            <div className="bg-bg-black bg-cover text-main ">
                <div
                    className={clsx(
                        classes?.container,
                        "h-screen bg-bgdetail bg-cover  overflow-y-scroll custom-scrollbar",
                        isBlur()
                    )}
                >
                    <Header />
                    <div className="flex pt-28  w-screen h-5/6 relative ">
                        <ButtonBack />
                        <div className="flex justify-center px-20 w-1/2 ">
                            <InfoHero hero={hero} />
                        </div>
                        <div className="flex justify-center pr-28 w-1/2 pt-12">
                            <DetailInfo
                                hero={hero}
                                onClickBuy={handleBuyHero}
                                onClickSell={handleSellHero}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center w-screen mt-14">
                        <Tooltip
                            open={showHistory}
                            title="History"
                            placement="top"
                            arrow
                        >
                            <div
                                className={clsx(
                                    classes?.history,
                                    "bg-yellow_m_button flex  bg-cover  justify-center items-center "
                                )}
                                onClick={toggleHistory}
                            >
                                <Button>
                                    <span className=" text-2xl font-semibold pb-2 text-main">
                                        History
                                    </span>
                                </Button>
                            </div>
                        </Tooltip>
                    </div>

                    {showHistory && <HistoryTrans />}
                    <img src={footer} className="mt-28"></img>
                </div>
            </div>
        </>
    );
};
