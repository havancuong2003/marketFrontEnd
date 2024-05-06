import { Header, PaginationActivity } from "../../components";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";
import avatar from "../../assets/img/avatar-account.png";
import { useAccountInformation } from "../../hooks";
import dayjs from "dayjs";
import { TOKEN, VITE_API_URL } from "../../env";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import ru from "javascript-time-ago/locale/ru";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../../types";
import clsx from "clsx";
import hero from '../../assets/img/HeroImage.png' 

type ActivitiesProps = {
    classes?: {
        [key: string]: string;
    };
};

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
function LastSeen({ date }) {
    const dateNow = new Date();
    if (dayjs(dateNow).diff(dayjs(date), "hours") <= 24) {
        return <ReactTimeAgo date={date} locale="en-US" />;
    } else {
        return date ? dayjs(date).format("DD MMM YYYY, HH:mm") : "-";
    }
}
const mappingItemBackgroundColor = {
    LIST: "text-red-500",
    DELIST: "text-green-500",
    SALE: "text-blue-500",
    PURCHASE: "text-yellow-500",
};

const mappingActionDetail = {
    LIST: "Viewing the list",
    DELIST: "Removing from the list",
    SALE: "On sale",
    PURCHASE: "Making a purchase",
};
const items_per_page = 10;
export const Activities :React.FC<ActivitiesProps> = ({classes}) => {
    const [searchParams] = useSearchParams();
    const { account } = useAccountInformation();
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(0);
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const actionValues = Object.values(Event);
    useEffect(() => {
        // todo: check page value
        let page = Number(searchParams.get("page"));
        if (!page) page = 1;
        if (isNaN(page)) page = 1;
        setCurrentPage(page);

        // todo fetch data
        axios
            .get(VITE_API_URL + "/api/v1/activity", {
                params: {
                    page: page,
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
                setActivities(res.data.records);
                setTotalRecords(res.data.totalRecords);
                setTotalPage(Math.ceil(totalRecords/ items_per_page));
            })
            .catch((err) => {
                console.log(err);
            });
            
    }, [searchParams, totalRecords]);
    
    
    //console.log("total page",totalPage)
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className={clsx(classes?.container, "font-home")}>
                <div className="">
                <div className={clsx(classes?.heroImage)}>
                    <span className={clsx("text-4xl text-white")}>
                        Activities
                    </span>
                    <img src={hero} alt="" />
                </div>
                    <div className={clsx(classes?.containerActivities,"flex")}>
                        <div className={clsx(classes?.containerProfile,"")}>
                            <div className="pt-10">
                                <img src={avatar} alt="" className="pb-3 p-5" />
                                <p className="text-4xl font-semibold text-white pb-3">
                                    {account["username"]}
                                </p>
                                <p className="text-sm font-semibold text-white pb-14">
                                    #{account["id"]}
                                </p>
                                <ButtonInventory selectedItem={"Activities"} />
                            </div>
                        </div>
                        
                        <div className={clsx(classes?.tableActivities)}>
                            <div className="mt-5 ml-10 mr-10">
                                <div>
                                    <span className={clsx(classes?.title,"text-2xl text-white")}>
                                        Activities
                                    </span>
                                    <div className="flex items-end">
                                        <ul className="items-end">
                                            {actionValues.map((item) => (
                                                <li
                                                    key={item}
                                                    className={clsx(
                                                        mappingItemBackgroundColor[
                                                            item
                                                        ]
                                                    )}
                                                >
                                                    {item} :{" "}
                                                    {mappingActionDetail[item]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <table className=" w-full table-auto border-collapse">
                                    <thead className="text-[#968469] text-2xl border-b-2 border-[#B7A284] border-opacity-20 mt-5 mb-5 flex w-full">
                                        <tr className="flex w-full">
                                            <td className="w-1/5">Event</td>
                                            <td className="w-1/5">Item</td>
                                            <td className="w-1/5">Value</td>
                                            <td className="w-1/5">Opposite</td>
                                            <td className="w-1/5">Time</td>
                                        </tr>
                                    </thead>

                                    <tbody className="text-[#CCC3B5] text-sm mt-5 mb-5 flex flex-col  justify-between overflow-y-scroll w-full h-[500px]">
                                        {activities.map((item) => (
                                            <tr
                                                className={clsx(
                                                    "border-b border-[#B7A284] border-opacity-20 flex w-full"
                                                )}
                                            >
                                                <td
                                                    className={clsx(
                                                        mappingItemBackgroundColor[
                                                            item.event
                                                        ],
                                                        "w-1/5 mt-5 mb-5"
                                                    )}
                                                >
                                                    {item["event"]
                                                        ? item["event"]
                                                        : "-"}
                                                </td>
                                                <td
                                                    onClick={() => {
                                                        navigate(
                                                            "../hero/" +
                                                                item.hero_id +
                                                                "/detail"
                                                        );
                                                    }}
                                                    className="w-1/5 mt-5 mb- cursor-pointer"
                                                >
                                                    ID:
                                                    {item.hero_id
                                                        ? item.hero_id
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5 text-end pr-20">
                                                    {item.value
                                                        ? item.value +
                                                          " " +
                                                          TOKEN
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {item.opposite_user_id
                                                        ? item.opposite_user_id.substring(
                                                              0,
                                                              4
                                                          ) +
                                                          "..." +
                                                          item.opposite_user_id.substring(
                                                              item
                                                                  .opposite_user_id
                                                                  .length - 4
                                                          )
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {LastSeen({
                                                        date: item["time"],
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div>
                                    <PaginationActivity
                                    currentPage={currentPage}
                                    totalPage={totalPage}
                                    totalRecords={totalRecords}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
