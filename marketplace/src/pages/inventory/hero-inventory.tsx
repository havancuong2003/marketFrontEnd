import { Header } from "../../components";

import { ButtonInventory } from "../../components/common/inventory/button-inventory";
import { useInventory, useAccountInformation } from "../../hooks";
import { Class, Race, Rank } from "../../types";
import avatar from "../../assets/img/avatar-account.png";
import herotext from "../../assets/img/hero.png";
import { FilterInventory } from "../../components/common/inventory";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { DetailHero } from "../../components/common/detail-hero";

type InventoryHeroProps = {
  classes?: {
    [key: string]: string;
  };
};
export const InventoryHero: React.FC<InventoryHeroProps> = ({ classes }) => {
  const { heros, inventory } = useInventory();
  console.log("iv", inventory);

  if (Array.isArray(heros)) {
    console.log("arr", heros);
  }
  if (typeof heros === "object" && heros !== null) {
    console.log("obj", heros);
  }

  const [heroInventory, setHeroInventory] = useState([]);
  useEffect(() => {
    setHeroInventory(heros);
  }, [heros]);

  const { account } = useAccountInformation();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className={clsx(classes?.bgInventory, "w-full h-screen")}>
        <div className="flex">
          <div
            className={clsx(
              classes?.mainAvatar,
              "w-1/4 bg-bgprofile bg-cover bg-center flex justify-center text-center h-[800px] ml-24 "
            )}
          >
            <div className="pt-10">
              <img src={avatar} alt="" className="pb-3 p-5" />
              <p className="text-4xl font-semibold text-white pb-3">
                {account.username}
              </p>
              <p className="text-sm font-semibold text-white pb-14">
                #{account.id}
              </p>
              <ButtonInventory selectedItem={"Inventory"} />
            </div>
          </div>
          <div className={clsx(classes?.mainInventory, "w-full")}>
            <div className={clsx("w-full ")}>
              <div className="flex">
                <div>
                  <img src={herotext} alt="" />
                </div>
                <div className="flex text-end">
                  <div>
                    <FilterInventory
                      component={[
                        Rank.CHIEFTAIN,
                        Rank.OVERSEER,
                        Rank.WARMONGER,
                        Rank.WARRIOR,
                      ]}
                    />
                  </div>
                  <div>
                    <FilterInventory
                      component={[
                        Race.ANTUK,
                        Race.KRAKEE,
                        Race.MANTAH,
                        Race.MONTAK,
                        Race.MUU,
                      ]}
                    />
                  </div>
                  <div>
                    <FilterInventory
                      component={[
                        Class.AIR,
                        Class.MAGE,
                        Class.MELEE,
                        Class.RANGE,
                        Class.TANKER,
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="  w-full h-full">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                  {heroInventory.map((hero) => (
                    <div
                      key={hero.id}
                      onClick={() => navigate("/hero/" + hero.id + "/detail")}
                      className="cursor-pointer"
                    >
                      <DetailHero
                        key={hero.id}
                        price={hero.price}
                        hp={hero.hp}
                        speed={hero.speed}
                        dps={hero.dps}
                        atk={hero.power}
                        race={hero.race}
                        classess={hero.class}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
