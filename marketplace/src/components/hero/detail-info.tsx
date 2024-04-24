import okg_token from "../../assets/img/OKGToken.png"
import atk from "../../assets/img/ATK.png"
import atk_speed from "../../assets/img/ATK Speed.png"
import hp from "../../assets/img/HP.png"
import dps from "../../assets/img/DPS.png"
import { useNavigate } from "react-router-dom"
import { ShortId } from "../../services"
import { jwtDecode } from "jwt-decode"
import { useDelistHero } from "../../hooks/use-delist-hero"

import { isAuthenticated } from "../../utils"

export const DetailInfor = ({ hero }) => {
    const { delist } = useDelistHero()
    const token = localStorage.getItem("token")

    const navigate = useNavigate()
    const handeLeDelist = () => {
        if (isAuthenticated()) {
            delist()
        } else {
            navigate("/login")
        }
    }
    const decode = token ? jwtDecode(token) : undefined

    return (
        <div className="container ">
            <div className="text-white h-1/6">
                <div className="bg-[#423429] rounded-xl bg-cover h-43% flex items-center">
                    <span className="ml-4 font-bold text-2xl">
                        {" "}
                        {hero.name}
                    </span>
                </div>
                <div className="flex h-29% justify-between mt-5 ">
                    <div className="bg-[#423429] rounded-xl bg-cover w-48%  flex items-center">
                        <div className="ml-4">
                            <span>ID:</span>
                            <span>{hero.id}</span>
                        </div>
                    </div>
                    <div className="bg-[#423429] rounded-xl bg-cover w-48% flex items-center">
                        <div className="ml-4 text-s">
                            <span>Owner: </span>
                            <span className="truncate">
                                {ShortId(hero.account_id)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-5 h-11%">
                <div className="flex relative h-full ">
                    <div className="bg-[#170A02] rounded-2xl opacity-80  bg-cover w-full h-90%  flex items-center">
                        <div className="ml-4 text-white flex items-center">
                            <img src={okg_token} alt=""></img>
                            <span className="ml-2 font-medium text-3xl">
                                {" "}
                                {hero.price}
                            </span>
                        </div>
                    </div>
                    <div className="absolute right-0 w-1/3 h-90% ">
                        {isAuthenticated() ? (
                            decode.id === hero.account_id ? (
                                <div className=" w-2/3 h-2/3 pt-4 ">
                                    <div
                                        className="bg-[#170A02] bg-cover flex items-center justify-center cursor-pointer border-solid border-2 border-lime-50 rounded-xl "
                                        onClick={handeLeDelist}
                                    >
                                        <span className="text-white text-2xl font-medium ">
                                            Delist
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow_m_button bg-cover h-full flex items-center justify-center cursor-pointer ">
                                    <span className="text-white text-3xl font-medium ">
                                        Buy
                                    </span>
                                </div>
                            )
                        ) : (
                            <div
                                className="bg-yellow_m_button bg-cover h-full flex items-center justify-center cursor-pointer "
                                onClick={() =>
                                    navigate(
                                        isAuthenticated()
                                            ? "/profile"
                                            : "/login"
                                    )
                                }
                            >
                                <span className="text-white text-3xl font-medium ">
                                    Buy
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#170A02] rounded-2xl opacity-80 bg-cover  relative">
                <div className="text-white p-2 ">
                    <div className="mb-5">
                        <span className="text-2xl font-medium">HERO STATS</span>
                    </div>
                    <div className="">
                        <div className="flex justify-between items-center pt-3.5">
                            <div className="">
                                <span className="text-[16px]  text-[#B7A284]">
                                    Combat power (CP)
                                </span>
                                <br />
                                <span className="text-2xl font-bold">
                                    {hero.power}
                                </span>
                            </div>
                            <div className="flex ">
                                <div className="mx-10">
                                    <div>
                                        <span className="text-[14px]  text-[#B7A284]">
                                            Health (HP)
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            <img src={hp} className="w-5/6" />
                                        </div>
                                        <span className="text-2xl font-semibold">
                                            {" "}
                                            {hero.hp}
                                        </span>
                                    </div>
                                </div>

                                <div className="mx-10">
                                    <div>
                                        <span className="text-[14px] text-[#B7A284]">
                                            Attack (ATK)
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <img src={atk} className="w-5/6" />
                                        </div>
                                        <span className="text-2xl font-semibold">
                                            {hero.power}
                                        </span>
                                    </div>
                                </div>

                                <div className="mx-10">
                                    <div>
                                        <span className="text-[14px]  text-[#B7A284]">
                                            Speed (SPD)
                                        </span>
                                    </div>
                                    <div className="flex  items-center">
                                        <div>
                                            <img
                                                src={atk_speed}
                                                className="w-5/6"
                                            />
                                        </div>
                                        <span className="text-2xl font-semibold">
                                            {hero.speed}
                                        </span>
                                    </div>
                                </div>

                                <div className="mx-10">
                                    <div>
                                        <span className="text-[14px]  text-[#B7A284]">
                                            DPS
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <img src={dps} className="w-5/6" />
                                        </div>
                                        <span className="text-2xl font-semibold">
                                            {hero.dps}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
