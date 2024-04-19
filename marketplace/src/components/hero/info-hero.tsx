import { DetailHeroProps } from "../../types";
import avatar from "../../assets/img/avatar.png";
import frame from "../../assets/img/grand-chief.png";
import graytag from "../../assets/img/graytag.png";
export const InfoHero = ({
  hero,
  // name,
  // price,
  // hp,
  // speed,
  // dps,
  // atk,
  // race,
  // classes,
  // avatar,
  // rank,
  // status,
}) => {
  return (
    // <div className="container w-[672px] h-[766px] relative">
    //   <div className="w-full h-[626px] relative flex justify-center">
    //     <img src={avatar} alt="avatar" className="w-full h-full" />

    //     <div className="bg-black absolute w-[640px] h-[80px] opacity-70 text-white top-1 flex justify-center items-center">
    //       <span className=" text-3xl">{hero.rank}</span>
    //     </div>

    //     <div className="absolute top-0 left-0 w-full h-full bg-avarta bg-cover bg-center rounded-lg">
    //       <img src={frame} alt="avatar" className="w-full h-full flex" />
    //     </div>
    //   </div>

    //   <div className="flex inline absolute  w-full h-[123px] font-bold grid grid-cols-2 bottom-[45px]">
    //     <div className="bg-graytag bg-cover items-center flex  w-[336px] h-[123px]">
    //       <div className="ml-4">
    //         <span>Race</span>
    //         <br />
    //         <span>{hero.race}</span>
    //       </div>
    //     </div>

    //     <div className="bg-graytag bg-cover items-center flex  w-[336px] h-[123px]">
    //       <div className="ml-4">
    //         <span>Class</span>
    //         <br />
    //         <span>{hero.class}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container flex p-12 justify-center">
      <div className="relative flex justify-center">
        <div className="relative  flex justify-center">
          <div className="flex justify-center">
            <div className="flex justify-center w-95%">
              <img src={avatar} alt="avatar" className="" />
            </div>
            <div className="bg-black absolute w-full h-10% opacity-70 text-white top-2 flex justify-center items-center">
              <span className=" text-3xl">{hero.rank}</span>
            </div>
          </div>
          <div className="absolute top-0 h-full bg-avarta bg-cover bg-center rounded-lg">
            <img src={frame} alt="avatar" className="w-full h-full" />
          </div>
        </div>
        <div className=" w-full h-18 grid grid-cols-2 font-bold absolute -bottom-20 ">
          <div className="bg-graytag bg-cover items-center flex">
            <div className="ml-4">
              <span>Race</span>
              <br />
              <span>{hero.race}</span>
            </div>
          </div>
          <div className="bg-graytag bg-cover items-center flex">
            <div className="ml-4">
              <span>Class</span>
              <br />
              <span>{hero.class}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
