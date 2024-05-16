import { CopyText, Header, PaginationActivity } from "../../components";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";
import avatar from "../../assets/img/avatar-account.png";
import { useAccountInformation, useCheckMobileScreen } from "../../hooks";
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
import hero from "../../assets/img/HeroImage.png";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { Activity } from "../../models";
import { ShortId } from "../../services";

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
const mappingItemTextColor = {
    ALL: "white",
    LIST: "red",
    DELIST: "green",
    SALE: "blue",
    PURCHASE: "yellow",
};

const mappingActionDetail = {
    LIST: "Viewing the list",
    DELIST: "Removing from the list",
    SALE: "On sale",
    PURCHASE: "Making a purchase",
};

export const Activities: React.FC<ActivitiesProps> = ({ classes }) => {
    const [searchParams] = useSearchParams();
    const { account } = useAccountInformation();
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(0);
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const actionValues = Object.values(Event);
    const checkMobile = useCheckMobileScreen();
    const items_per_page = 10;
    const [eventSearch, setEvent] = useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setEvent(event.target.value);
        //navigate(`?event=${event.target.value}`);
    };
    useEffect(() => {
        if (eventSearch === "") {
            setEvent("ALL");
        }
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
                    event: eventSearch,
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
                console.log(res.data.records);
                setTotalRecords(res.data.totalRecords);
                setTotalPage(Math.ceil(totalRecords / items_per_page));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [searchParams, totalRecords, currentPage, eventSearch]);

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
                            ACTIVITIES
                        </span>
                        <img src={hero} alt="" />
                    </div>

                    <div className={clsx(classes?.containerActivities, "flex")}>
                        <div className={clsx(classes?.containerProfile, "")}>
                            <div className="pt-10">
                                <img src={avatar} alt="" className="pb-3 p-5" />
                                <p className={clsx(classes?.text,"text-4xl font-semibold text-white")}>
                                    {account["username"]}
                                </p>
                                <p className={clsx(classes?.text,"text-sm font-semibold text-white pl-10")}>
                                    # {ShortId(account["id"])}
                                    <CopyText text={account["id"]} />
                                </p>
                                
                                
                                <ButtonInventory selectedItem={"Activities"} />
                            </div>
                        </div>

                        <div className={clsx(classes?.tableActivities)}>
                            <div className="mt-5 ml-10 mr-10">
                                <div>
                                    <span
                                        className={clsx(
                                            classes?.title,
                                            "text-2xl text-white"
                                        )}
                                    >
                                        Activities
                                    </span>
                                    <div className="flex items-end">
                                        <div className={clsx(classes?.filter,"w-full")}>
                                            <FormControl className={clsx(classes?.formControl)}
                                                sx={{
                                                    m: 1,
                                                    width: 150,
                                                    maxWidth: "90%", // Default minWidth
                                                    "@media (max-width: 1024px)":
                                                        {
                                                            minWidth: "80%", // Adjust minWidth for screens with max-width of 600px
                                                        },
                                                    "& .MuiInputLabel-root": {
                                                        // Màu text của InputLabel
                                                        color: "#F1E9DC",
                                                    },
                                                    "& .MuiInputBase-root": {
                                                        color: mappingItemTextColor[
                                                            eventSearch
                                                        ], // Màu text của Select khi không focus
                                                    },

                                                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                        {
                                                            borderColor: "gray",
                                                        },
                                                        "& .MuiSelect-icon": {
                                                            color: "#F1E9DC", // Màu của mũi tên là màu cam
                                                          },
                                                }}
                                                size="medium"
                                            >
                                                <InputLabel id="demo-select-small-label">
                                                    EVENT
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    value={eventSearch}
                                                    label="EVENT"
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value="ALL">
                                                        <span>ALL</span>
                                                    </MenuItem>
                                                    {actionValues.map(
                                                        (value) => (
                                                            <MenuItem
                                                                key={value}
                                                                value={value}
                                                            >
                                                                {value}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div
                                            className={clsx(
                                                classes?.info,
                                                "w-full grid grid-cols-2 gap-2 pb-2 pl-28"
                                            )}
                                        >
                                            {actionValues.map((item) => (
                                                <div
                                                    key={item}
                                                    className={clsx(
                                                        mappingItemBackgroundColor[
                                                            item
                                                        ]
                                                    )}
                                                >
                                                    {item} :{" "}
                                                    {mappingActionDetail[item]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <table
                                    className={clsx(
                                        checkMobile
                                            ? "max-h-[300px]"
                                            : "max-h-[800px]",
                                        " w-full table-auto border-collapse"
                                    )}
                                >
                                    <thead
                                        className={clsx(
                                            classes?.tableHead,
                                            "text-[#968469] border-b-2 border-[#B7A284] border-opacity-20 mt-5 mb-5 flex w-full"
                                        )}
                                    >
                                        <tr className="flex w-full">
                                            <td className="w-1/5">Event</td>
                                            <td className="w-1/5">Item</td>
                                            <td className="w-1/5">Value</td>
                                            <td className="w-1/5">Opposite</td>
                                            <td className="w-1/5">Time</td>
                                        </tr>
                                    </thead>

                                    <tbody
                                        className={clsx(
                                            checkMobile
                                                ? "max-h-[300px]"
                                                : "max-h-[800px]",
                                            "custom-scrollbar text-[#CCC3B5] mt-5 mb-5 flex flex-col  justify-between overflow-y-scroll w-full"
                                        )}
                                        id="style-2"
                                    >
                                        {activities.map((item: Activity) => (
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
                                                    className="w-1/5 mt-5 "
                                                >
                                                    
                                                    {item.hero_id
                                                        ? <>
                                                        <span
                                                        className="cursor-pointer underline"
                                                        onClick={() => {
                                                        navigate(
                                                            "../hero/" +
                                                                item.hero_id +
                                                                "/detail"
                                                        );
                                                    }}>
                                                            ID:{item.hero_id}
                                                        </span>
                                                        <CopyText text={item.hero_id}></CopyText>
                                                        </>
                                                        : "-"}
                                                </td>
                                                <td className={"w-1/5 mt-5 mb-5"}>
                                                    {item.value
                                                        ? item.value.toString() +
                                                          " " +
                                                          TOKEN
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {item.opposite_user_id

                                                        ?  <>
                                                            {ShortId(item.opposite_user_id)} 
                                                          <CopyText text={item.opposite_user_id}></CopyText>
                                                        
                                                            </>
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
