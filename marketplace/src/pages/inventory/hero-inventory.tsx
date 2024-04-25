import { Header } from "../../components"
import { ButtonInventory } from "../../components/common/inventory/button-inventory"
import { useInventory } from "../../hooks/use-hero-inventory"
import { Class, Race, Rank } from "../../types"
import avatar from "../../assets/img/avatar-account.png"
import herotext from "../../assets/img/hero.png"
import { FilterInventory } from "../../components/common/inventory"
interface Inventory {
    id: string
    name: string
    class: Class
    race: Race
    rank: Rank
    level: number
    image: string
}
export const InventoryHero = () => {
    const { inventory } = useInventory() as {
        inventory: Inventory[]
    }

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
                                    Hero Huy
                                </p>
                                <p className="text-sm font-semibold text-white pb-14">
                                    #1244534
                                </p>
                                <ButtonInventory
                                    component={[
                                        "Inventory",
                                        "Activities",
                                        "Profile settings",
                                    ]}
                                    selectedItem={"Inventory"}
                                />
                            </div>
                        </div>
                        <div className="w-full ml-24 mr-24 mt-12">
                            <div className="flex">
                                <img src={herotext} alt="" />
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
                            <div className=" bg-black  h-[2000px]">
                                <div className="text-white">
                                    {inventory.map((item) => (
                                        <div key={item.id}>{item.rank}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
