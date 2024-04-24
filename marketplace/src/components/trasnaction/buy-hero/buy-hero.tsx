import React, { useState } from "react";
import clsx from "clsx";
import avatar from "../../../assets/img/avatar.png";
import okg_token from "../../../assets/img/OKGToken.png";
import x_button from "../../../assets/img/xbutton.png";
import { Hero } from "../../../models/hero";
import { buyHero } from "../../common";
type BuyHeroProps = {
  classes?: {
    [key: string]: string;
  };
  hero: Hero;
  onClickX: () => void;
  onClickPay: () => void;
};
export const BuyHero: React.FC<BuyHeroProps> = ({
  classes,
  hero,
  onClickX,
  onClickPay,
}) => {
  const [error, setError] = useState("");
  const handleCheckOut = async (id: number) => {
    const { error } = await buyHero(id);
    setError(error);
    if (!error) {
      onClickPay();
    }
  };

  return (
    <div
      className={clsx(classes?.container, "bg-cover bg-center absolute top-14")}
    >
      <div className="absolute top-0 right-0 cursor-pointer">
        <img src={x_button} alt="" onClick={onClickX}></img>
      </div>
      <div className="flex justify-center text-3xl font-bold mb-8">
        <span>PURCHASING ITEM</span>
      </div>
      <div className={clsx(classes?.center, "bg-brown-op rounded-lg  flex ")}>
        <div className="w-1/2 flex justify-center items-center">
          <img
            src={avatar}
            className={clsx(classes?.avatar, "rounded-md")}
            alt=""
          />
        </div>
        <div className="w-1/2 grid grid-rows-3 mt-7 pr-10">
          <div className=" row-span-2">
            <span>{hero.name}</span>
            <hr />
            <div className="mt-3">
              <span>ID:</span> <span>{hero.id}</span>
            </div>
            <div className="mt-3">
              <span>Owner:</span> <span>{hero.account_id}</span>
            </div>
            <br />
          </div>
          <div className="my-10 row-span-1 ">
            <div className="flex justify-between">
              <span>Total amount</span>
              {error && <span className="text-red-500">{error}</span>}
            </div>

            <hr className="my-2" />
            <div className="flex justify-between items-center ">
              <span className="font-bold text-xl ">{hero.price}</span>
              <div className="flex items-center ">
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
            "bg-yellow_l flex justify-center items-center text-xl font-bold"
          )}
          onClick={() => handleCheckOut(hero.id)}
        >
          <span>CHECK OUT </span>
        </div>
      </div>
    </div>
  );
};
