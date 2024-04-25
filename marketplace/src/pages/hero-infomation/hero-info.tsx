import { DetailInfo, Header, HistoryTrans, InfoHero } from "../../components";
import { useHeroDetail } from "../../hooks/use-hero-info";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import footer from "../../assets/img/Footer.png";
import clsx from "clsx";

import {
    BuyHero,
    PaySucceeded,
    SellHero,
    ListingSucceeded,
} from "../../components/trasnaction";
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
            <Header />
            {showBuy && !isPay && (
                <div className=" flex justify-center relative ">
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

            <div className="bg-bg-black bg-cover">
                <div
                    className={clsx(
                        classes?.container,
                        "h-screen bg-bgdetail",
                        isBlur()
                    )}
                >
                    <div className="container w-screen">
                        <div className="flex pt-28  w-screen h-5/6 relative">
                            <div
                                className="absolute top-14 left-20 text-white font-medium cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                <span>
                                    {"< "}
                                    Back
                                </span>
                            </div>
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
                            <div
                                className={clsx(
                                    classes?.history,
                                    "bg-yellow_m_button flex  bg-cover  justify-center items-center cursor-pointer"
                                )}
                                onClick={toggleHistory}
                            >
                                <span className="text-white text-2xl font-semibold pb-2">
                                    History
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {showHistory && (
                    <div>
                        <HistoryTrans />
                    </div>
                )}
                <div>
                    <img src={footer}></img>
                </div>
            </div>
        </>
    );
};
