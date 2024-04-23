import { DetailInfor, Header, HistoryTrans, InfoHero } from "../../components";
import { useHeroDetail } from "../../hooks/use-hero-info";
import { useNavigate } from "react-router-dom";
import { useHistoryTrans } from "../../hooks/use-history-trans";
import { useState } from "react";
import footer from "../../assets/img/Footer.png";
import { BuyHero } from "../../components/trasnaction";

export const HeroDetail = () => {
  const hero = useHeroDetail();
  const { historyTrans } = useHistoryTrans();
  const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState(false);
  const [showBuy, setShowBuy] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleBuyHero = () => {
    setShowBuy(!showBuy);
  };

  return (
    <>
      <Header />
      <div className="bg-[#151515] bg-cover">
        <div className=" h-screen bg-bgdetail bg-cover">
          {showBuy && (
            <div className=" flex justify-center relative ">
              <BuyHero hero={hero} onClickX={handleBuyHero} />
            </div>
          )}

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
                <DetailInfor hero={hero} onClickBuy={handleBuyHero} />
              </div>
            </div>

            <div className="flex justify-center w-screen absolute bottom-0">
              <div
                className="w-[260px] h-[68px] bg-yellow_m_button bg-cover items-center flex justify-center cursor-pointer"
                onClick={toggleHistory}
              >
                <span className="text-white text-xl font-semibold">
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
