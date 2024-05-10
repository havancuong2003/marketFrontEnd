import { DetailInfo, Header, InfoHero, ButtonBack } from "../../components";
import { useHeroDetail } from "../../hooks/use-hero-info";
import React, { useState } from "react";
import clsx from "clsx";
import { HistoryTrans } from "../../components/history_trans/list-history-trans";
import {
    BuyHero,
    PaySucceeded,
    SellHero,
    ListingSucceeded,
} from "../../components/trasnaction";

import { Button, Tooltip } from "@mui/material";
import { Hero } from "../../models";

type HeroDetailProps = {
    classes?: {
        [key: string]: string;
    };
    hero: Hero;
};
export const HeroDetail: React.FC<HeroDetailProps> = ({ classes }) => {
    const hero = useHeroDetail();
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
                        "h-screen bg-bgdetail bg-cover  overflow-y-scroll custom-scrollbar relative",
                        isBlur()
                    )}
                >
                    <Header />
                    <div className={clsx(classes?.content)}>
                        <ButtonBack />
                        <div className={clsx(classes?.info_hero)}>
                            <InfoHero hero={hero} />
                        </div>
                        <div className={clsx(classes?.detail_hero)}>
                            <DetailInfo
                                hero={hero}
                                onClickBuy={handleBuyHero}
                                onClickSell={handleSellHero}
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            classes?.history,
                            "flex justify-center w-screen mt-28"
                        )}
                    >
                        <Tooltip
                            open={showHistory}
                            title="History"
                            placement="top"
                            arrow
                        >
                            <div
                                className={clsx(
                                    classes?.bt_history,
                                    "bg-yellow_m_button flex  bg-cover  justify-center items-center "
                                )}
                                onClick={toggleHistory}
                            >
                                <Button>
                                    <span className=" text-2xl pb-2 text-main font-Skranji ">
                                        History
                                    </span>
                                </Button>
                            </div>
                        </Tooltip>
                    </div>

                    {showHistory && <HistoryTrans heroId={hero.id} />}
                    {/* <img src={footer} className="mt-28"></img> */}
                </div>
            </div>
        </>
    );
};
