import React from "react";
import clsx from "clsx";
import arrow from "../../../assets/img/arrow_2.png";
import { useNavigate } from "react-router-dom";

type ListingProps = {
  classes?: {
    [key: string]: string;
  };
};

export const ListingSucceeded: React.FC<ListingProps> = ({ classes }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        classes?.container,
        "bg-cover bg-center absolute top-40 flex justify-center items-center"
      )}
    >
      <div className=" ">
        <div className="flex justify-center py-5">
          <img src={arrow} alt="" className={classes?.arrow}></img>
        </div>
        <div className="flex justify-center pt-5 text-3xl font-bold">
          <span>LISTING COMPLETE</span>
        </div>
        <div className="flex justify-center pt-4 text-xl ">
          <span>Your item is now on the top of Marketplace.</span>
        </div>
        <div className="pt-10">
          <div
            className={clsx(
              classes?.view_item,
              "bg-yellow_l flex justify-center items-center  text-xl font-bold"
            )}
            onClick={() => navigate("/inventory")}
          >
            <span>VIEW ITEM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
