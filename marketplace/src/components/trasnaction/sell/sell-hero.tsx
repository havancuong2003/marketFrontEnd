import React, { useState } from "react";
import clsx from "clsx";
import avatar from "../../../assets/img/avatar.png";
import okg_token from "../../../assets/img/OKGToken.png";
import x_button from "../../../assets/img/xbutton.png";
import { Hero } from "../../../models/hero";
import { handleSelling } from "../../common";

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

    if (inputValue === "") {
      setErrorPrice("Prize is required");
    } else if (isNaN(Number(inputValue))) {
      setErrorPrice("Must be a number");
    } else if (Number(inputValue) < 0) {
      setErrorPrice("Prize must be positive");
    } else {
      setErrorPrice("");
    }

    setPrice(inputValue);
  };

  const handleSubmit = async (price, id: number) => {
    if (errorPrice !== "") {
      return;
    }
    try {
      await handleSelling(price, id);
      onClickSell();
    } catch (error) {
      console.log("error selling", error);
    }
  };

  return (
    <div
      className={clsx(classes?.container, "bg-cover bg-center absolute top-14")}
    >
      <div className="absolute top-0 right-0">
        <img src={x_button} alt="" onClick={onClickX}></img>
      </div>
      <div className="flex justify-center text-3xl font-bold mb-8">
        <span>LISTING ITEM</span>
      </div>
      <div className={clsx(classes?.center, "bg-brown-op rounded-lg  flex ")}>
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
              {errorPrice && <span className="text-red-500">{errorPrice}</span>}
            </div>
            <div className="flex justify-between items-center relative">
              <input
                className={clsx(
                  classes?.input,
                  "bg-light-brown rounded-md text-my-brown text-xl font-bold my-2 pl-3 "
                )}
                type="text"
                value={price}
                onChange={handleInputChange}
              />
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
            "bg-yellow_l flex justify-center items-center text-xl font-bold"
          )}
        >
          <button
            className="w-full h-full cursor-pointer"
            onClick={() => {
              handleSubmit(price, hero.id);
            }}
          >
            Start Listing{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
