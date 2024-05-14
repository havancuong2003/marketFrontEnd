import { CopyText, FilterInventory, Header, PaginationActivity } from "../../components";
import axios from "axios";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";
import { useAccountInformation } from "../../hooks";
import { Class, Race, Rank } from "../../types";
import avatar from "../../assets/img/avatar-account.png";
import herotext from "../../assets/img/hero.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { DetailHero } from "../../components/common/detail-hero";
import hero from "../../assets/img/HeroImage.png";
import zero from "../../assets/img/zeroInventory.png";
import { VITE_API_URL } from "../../env";
import { Account, Hero } from "../../models";
import { SelectChangeEvent } from "@mui/material";
import { ShortId } from "../../services";



type InventoryHeroProps = {
    classes?: {
        [key: string]: string;
    };
};

const items_per_page = 2;

export const InventoryHero: React.FC<InventoryHeroProps> = ({ classes }) => {
    const [searchParams] = useSearchParams();
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [heroInventory, setHeroInventory] = useState([]);
    const actionClass = Object.values(Class);
    const actionRace = Object.values(Race);
    const actionRank = Object.values(Rank);


    const [eventSearchClass, setEventClass] = useState("ALL");
    const handleChangeClass = (event: SelectChangeEvent) => {
        setEventClass(event.target.value);
        //navigate(`?event=${event.target.value}`);
    };
    const [eventSearchRace, setEventRace] = useState("ALL");
    const handleChangeRace = (event: SelectChangeEvent) => {
        setEventRace(event.target.value);
        //navigate(`?event=${event.target.value}`);
    };
    const [eventSearchRank, setEventRank] = useState("ALL");
    const handleChangeRank = (event: SelectChangeEvent) => {
        setEventRank(event.target.value);
        //navigate(`?event=${event.target.value}`);
    };
    console.log("eventSearchRace", eventSearchRace);
    useEffect(() => {
        if(eventSearchClass === ""){
            setEventClass("ALL");
        }
        if(eventSearchRace === ""){
            setEventRace("ALL");
        }
        if(eventSearchRank === ""){
            setEventRank("ALL");
        }
        let page = Number(searchParams.get("page"));
        if (!page) page = 1;
        if (isNaN(page)) page = 1;
        setCurrentPage(page);
        axios
            .get(VITE_API_URL + "/api/v1/hero/show-inventory", {
                params: {
                    page: page,
                    class: eventSearchClass==="ALL"?"":eventSearchClass,
                    race: eventSearchRace==="ALL"?"":eventSearchRace,
                    rank: eventSearchRank==="ALL"?"":eventSearchRank
                },
                paramsSerializer: function customSerializer(params) {
                    // Customize serialization logic here
                    return Object.entries(params)
                        .map(([key, value]) => `${key}=${value}`)
                        .join("&");
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            // todo set records
            .then((res) => {
                setHeroInventory(res.data.data);
                setTotalRecords(res.data.totalItems);
                setTotalPage(Math.ceil(totalRecords / items_per_page));
                console.log("total page", res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },[searchParams,totalRecords,totalPage,eventSearchClass,eventSearchRace,eventSearchRank,currentPage]);


    
    const { account } = useAccountInformation() as unknown as {
        account: Account;
    };

    const navigate = useNavigate();
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className={clsx(classes?.bgInventory, "")}>
                <div className="flex">
                    <div className={clsx(classes?.mainAvatar, "")}>
                    <div className="pt-10">
                                <img src={avatar} alt="" className="pb-3 p-5" />
                                <p className={clsx(classes?.text,"text-4xl font-semibold text-white")}>
                                    {account["username"]}
                                </p>
                                <p className={clsx(classes?.text,"text-sm font-semibold text-white pl-10")}>
                                    # {ShortId(account["id"])}
                                    <CopyText text={account["id"]} />
                                </p>
                                
                                <ButtonInventory selectedItem={"Inventory"} />
                            </div>
                    </div>
                    <div className={clsx(classes?.mainInventory, "w-full")}>
                        <div className={clsx("w-full ")}>
                            <div className={clsx(classes?.heroImage)}>
                                <span className={clsx("text-4xl text-white")}>
                                    INVENTORY
                                </span>
                                <p className="text-white font-">
                                    Hero : {totalRecords}
                                </p>
                                <img src={hero} alt="" />
                            </div>
                            <div
                                className={clsx(
                                    classes?.filterInventory,
                                    "flex"
                                )}
                            >
                                <div>
                                    <img className="w-[200px]" src={herotext} alt="" />
                                </div>
                                <div className="flex text-end">
                                    <div>
                                        <FilterInventory name={"Class"} actionValues={actionClass} eventSearch={eventSearchClass} handleChange={handleChangeClass}>
                                        </FilterInventory>
                                    </div>
                                    <div>
                                    <FilterInventory name={"Race"} actionValues={actionRace} eventSearch={eventSearchRace} handleChange={handleChangeRace}>
                                        </FilterInventory>
                                    </div>
                                    <div>
                                    <FilterInventory name={"Rank"} actionValues={actionRank} eventSearch={eventSearchRank} handleChange={handleChangeRank}>
                                        </FilterInventory>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className=" flex my-10">
                                    {totalRecords === 0 ? (
                                        <div
                                            className={clsx(
                                                classes?.zeroInventory
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    classes?.zero_res,
                                                    ""
                                                )}
                                            >
                                                <br></br>
                                                <span className="text-xl">You have no Hero!<br></br>
                                                Let’s get some!</span>
                                                
                                                <p className="pt-4 pb-11 text-sm text-orange-400 underline cursor-pointer" onClick={()=>{navigate("/")}}>To marketplace</p>
                                            </div>
                                             <img
                                                className={clsx(
                                                    classes?.img_inventory,
                                                    ""
                                                )}
                                                src={zero}
                                                alt=""
                                            />
                                            
                                            <div
                                                className={clsx(
                                                    classes?.img_zero,
                                                    "pb-20"
                                                )}
                                                //src={zero_text}
                                                //alt=""
                                            >
                                                <br></br>
                                                <span  className="text-white text-4xl">
                                                    Let’s get <br></br>
                                                some heroes!</span>
                                                
                                                <p className="pt-4 text-sm text-orange-400 underline cursor-pointer" onClick={()=>{navigate("/")}}>To marketplace</p>
                                            </div>    
                                           
                                           
                                        </div>
                                    ) : (
                                    <div className="w-full">
                                    
                                    <div className={clsx(classes?.listInventory,"pl-60 justify-between pr-60")}>
                                        {heroInventory.map((hero : Hero) => (
                                            <div
                                            className={clsx(classes?.itemInventory)}
                                                key={hero.id}
                                            >
                                                <DetailHero
                                                    status={hero.status}
                                                    id={hero.id}
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
                                    <div className=" justify-items-end pr-10 pl-10 pt-24">
                                            <PaginationActivity
                                                currentPage={currentPage}
                                                totalPage={totalPage}
                                                totalRecords={totalRecords}
                                            />
                                    </div>
                                    
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
