import { DetailHero, Header } from "../../components";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";
import { useInventory, useAccountInformation } from "../../hooks";
import { Class, Race, Rank } from "../../types";
import avatar from "../../assets/img/avatar-account.png";
import herotext from "../../assets/img/hero.png";
import { FilterInventory } from "../../components/common/inventory";
import { useNavigate } from "react-router-dom";
import { Hero } from "../../models/hero";

export const InventoryHero = () => {
  const { heros, setHeros, inventory, setInventory } = useInventory();
  console.log("hero", heros);

  const { account, setAccount } = useAccountInformation();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="bg-bginventory w-full">
        <div className="">
          <div className="flex">
            <div className=" w-1/4 bg-bgprofile flex justify-center text-center h-[800px] ml-24 mt-24">
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
            <div>
              <div className="w-full ml-24 mr-24 mt-12">
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
                <div className=" bg-bgactivities w-full h-full mt-[500px]">
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 mx-12 my-10 lg:mx-52 lg:gap-40">
                    {heros.map((hero) => (
                      <div
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
    </div>
  );
};
