import { isAuthenticated } from "../../utils";
import okg_token from "../../assets/img/OKGToken.png";
import atk from "../../assets/img/ATK.png";
import atk_speed from "../../assets/img/ATK Speed.png";
import hp from "../../assets/img/HP.png";
import dps from "../../assets/img/DPS.png";
import { useNavigate } from "react-router-dom";
import { ShortId } from "../../services";

export const DetailInfor = ({ hero }) => {
  const token = localStorage.getItem("token") || false;
  const navigate = useNavigate();

  return (
    // <div className="container">
    //   <div className="text-white">
    //     <div className="bg-group36885 bg-cover w-[830px] h-[56px] flex items-center">
    //       <span className="ml-4 font-bold text-2xl"> {hero.name}</span>
    //     </div>
    //     <div className="flex w-[830px] h-[39px] justify-between mt-5 ">
    //       <div className="bg-frame36889 bg-cover w-[408px] h-full flex items-center">
    //         <div className="ml-4">
    //           <span>ID:</span>
    //           <span>{hero.id}</span>
    //         </div>
    //       </div>
    //       <div className="bg-frame36889 bg-cover w-[408px] h-full flex items-center">
    //         <div className="ml-4">
    //           <span>Owner:</span>
    //           <span> {hero.account_id}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="my-10">
    //     {isAuthenticated() ? (
    //       <div className="flex relative">
    //         <div className="bg-framebuy bg-cover w-[615px] h-[60px] flex items-center">
    //           <div className="ml-4 text-white flex items-center">
    //             <img src={okg_token} alt=""></img>
    //             <span className="ml-2 font-medium text-2xl"> {hero.price}</span>
    //           </div>
    //         </div>
    //         <div className="absolute top-0 right-0">
    //           <img src={button_buy} alt=""></img>
    //         </div>
    //       </div>
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>

    //   <div className="bg-rectangle2580 bg-cover w-[830px] h-[125px] my-10">
    //     <div className="text-white p-3">
    //       <div className="mb-3">
    //         <span className="text-[20px] font-semibold">HERO STATS</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <div className="">
    //           <span className="text-[15px]  text-[#B7A284]">
    //             Combat power (CP)
    //           </span>
    //           <br />
    //           <span className="text-xl font-bold">{hero.power}</span>
    //         </div>
    //         <div className="flex mx-10">
    //           <div className="mx-5">
    //             <div>
    //               <span className="text-[15px]  text-[#B7A284]">
    //                 Health (HP)
    //               </span>
    //             </div>
    //             <div className="flex">
    //               <div>
    //                 <img src={hp} />
    //               </div>
    //               <span className="text-xl font-semibold"> {hero.hp}</span>
    //             </div>
    //           </div>

    //           <div className="mx-5">
    //             <div>
    //               <span className="text-[15px]  text-[#B7A284]">
    //                 Attack (ATK)
    //               </span>
    //             </div>
    //             <div className="flex ">
    //               <div>
    //                 <img src={atk} />
    //               </div>
    //               <span className="text-xl font-semibold">{hero.power}</span>
    //             </div>
    //           </div>

    //           <div className="mx-5">
    //             <div>
    //               <span className="text-[15px]  text-[#B7A284]">
    //                 Speed (SPD)
    //               </span>
    //             </div>
    //             <div className="flex ">
    //               <div>
    //                 <img src={atk_speed} />
    //               </div>
    //               <span className="text-xl font-semibold">{hero.speed}</span>
    //             </div>
    //           </div>

    //           <div className="mx-5">
    //             <div>
    //               <span className="text-[15px]  text-[#B7A284]">DPS</span>
    //             </div>
    //             <div className="flex ">
    //               <div>
    //                 <img src={dps} />
    //               </div>
    //               <span className="text-xl font-semibold">{hero.dps}</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container ">
      <div className="text-white h-1/6">
        <div className="bg-[#423429] rounded-xl bg-cover h-43% flex items-center">
          <span className="ml-4 font-bold text-2xl"> {hero.name}</span>
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
              <span className="truncate">{ShortId(hero.account_id)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 h-11%">
        <div className="flex relative h-full ">
          <div className="bg-[#170A02] rounded-2xl opacity-80  bg-cover w-4/5 h-90%  flex items-center">
            <div className="ml-4 text-white flex items-center">
              <img src={okg_token} alt=""></img>
              <span className="ml-2 font-medium text-3xl"> {hero.price}</span>
            </div>
          </div>
          <div className="absolute right-0 w-1/3 h-90% ">
            {isAuthenticated() ? (
              <div className="bg-yellow_m_button bg-cover h-full flex items-center justify-center">
                <span className="text-white text-3xl font-medium ">Buy</span>
              </div>
            ) : (
              <div
                className="bg-yellow_m_button bg-cover h-full flex items-center justify-center  "
                onClick={() =>
                  navigate(isAuthenticated() ? "/profile" : "/login")
                }
              >
                <span className="text-white text-3xl font-medium ">Buy</span>
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
                <span className="text-2xl font-bold">{hero.power}</span>
              </div>
              <div className="flex ">
                <div className="mx-10">
                  <div>
                    <span className="text-[16px]  text-[#B7A284]">
                      Health (HP)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="">
                      <img src={hp} className="w-5/6" />
                    </div>
                    <span className="text-2xl font-semibold"> {hero.hp}</span>
                  </div>
                </div>

                <div className="mx-10">
                  <div>
                    <span className="text-[16px] text-[#B7A284]">
                      Attack (ATK)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <img src={atk} className="w-5/6" />
                    </div>
                    <span className="text-2xl font-semibold">{hero.power}</span>
                  </div>
                </div>

                <div className="mx-10">
                  <div>
                    <span className="text-[16px]  text-[#B7A284]">
                      Speed (SPD)
                    </span>
                  </div>
                  <div className="flex  items-center">
                    <div>
                      <img src={atk_speed} className="w-5/6" />
                    </div>
                    <span className="text-2xl font-semibold">{hero.speed}</span>
                  </div>
                </div>

                <div className="mx-10">
                  <div>
                    <span className="text-[16px]  text-[#B7A284]">DPS</span>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <img src={dps} className="w-5/6" />
                    </div>
                    <span className="text-2xl font-semibold">{hero.dps}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
