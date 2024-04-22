<<<<<<< HEAD
// interface DetailHeroProps {
//   price: number;
//   hp: number;
//   speed: number;
//   dps: number;
//   atk: number;
//   race: string;
//   classes: string;
// }

import { DetailHeroProps } from "../../types"
=======
interface DetailHeroProps {
    price: number
    hp: number
    speed: number
    dps: number
    atk: number
    race: string
    classes: string
}
>>>>>>> parent of c09efe0 (add:add responsive)
export const DetailHero = ({
    price,
    hp,
    speed,
    dps,
    atk,
    race,
    classes,
}: DetailHeroProps) => {
    return (
        <div className="bg-herocard w-[250px] h-[380px] mt-16 relative">
            <div className="w-[230px] h-[230px] border border-black absolute left-3 top-2">
                <div className="absolute top-0 left-0 w-[222px] h-[225px] bg-avarta bg-cover bg-center rounded-lg"></div>
            </div>
            <div className="flex justify-center items-center absolute bottom-28 left-10 text-white">
                <div className=" w-[70px] h-[30px] ml-2">
                    <span>HP: {hp}</span>
                </div>
                <div className=" w-[70px] h-[30px] ml-4">
                    <span>ATK: {atk}</span>
                </div>
            </div>
            <div className="flex justify-center items-center absolute bottom-20 left-10 text-white">
                <div className=" w-[70px] h-[30px] ml-2">
                    <span>SPD: {speed}</span>
                </div>
                <div className=" w-[70px] h-[30px] ml-4">
                    <span>DPS: {dps}</span>
                </div>
            </div>
            <div className="flex justify-center items-center absolute bottom-12 left-32 text-white text-2xl">
                <span>{price}</span>
            </div>
            <div className="flex justify-center items-center absolute bottom-2 left-9 text-white text-lg ">
                <span>{race}</span>
            </div>
            <div className="flex justify-center items-center absolute bottom-2 left-40 text-white text-lg">
                <span>{classes}</span>
            </div>
        </div>
    )
}
