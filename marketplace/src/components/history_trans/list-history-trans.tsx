import { useHistoryTrans } from "../../hooks/use-history-trans";
import { format, parseISO, differenceInHours } from "date-fns";
import { ShortId } from "../../services";
import { Tooltip } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export const HistoryTrans = () => {
    const { historyTrans } = useHistoryTrans();
    const formatDate = (dateString: string): string => {
        const parsedDate = parseISO(dateString);
        const formattedDate = format(parsedDate, "MMM dd yyyy HH:mm:ss");
        return formattedDate;
    };

    const time = Date();

    return (
        <div className="flex justify-center ">
            <div className="w-7/12  bg-[#170A02] mt-2 tex-sm ">
                <table className=" w-full table-auto border-collapse ">
                    <thead className="text-[#968469]  border-[#B7A284] border-opacity-20 mt-5 mb-5 flex ">
                        <tr className="flex w-full justify-between mx-32">
                            <th className="">
                                <span>Time</span>
                            </th>
                            <th className=" ">
                                <span>Value</span>
                            </th>
                            <th className="">
                                <span>Seller</span>
                            </th>
                            <th className=" ">
                                <span>Buyer</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-[#CCC3B5] px-20 mt-5 mb-5 flex flex-col  overflow-y-scroll custom-scrollbar h-[421px]">
                        {historyTrans.map((item) => (
                            <tr className="border-b border-[#B7A284] border-opacity-20 flex w-full justify-between">
                                <td className=" mt-5 mb-5">
                                    {differenceInHours(time, item.time) > 24 ? (
                                        <span>{formatDate(item.time)}</span>
                                    ) : (
                                        <span>
                                            {" "}
                                            <ReactTimeAgo
                                                date={item.time}
                                                locale="en-US"
                                                re
                                            />
                                        </span>
                                    )}
                                </td>
                                <td className=" mt-5 mb-5">
                                    <span>{item["value"]} OKG</span>
                                </td>
                                <td className=" mt-5 mb-5">
                                    <Tooltip
                                        title={item["seller"]}
                                        placement="top"
                                        arrow
                                    >
                                        <span>{ShortId(item["seller"])}</span>
                                    </Tooltip>
                                </td>
                                <td className=" mt-5 mb-5">
                                    <Tooltip
                                        title={item["buyer"]}
                                        placement="top"
                                        arrow
                                    >
                                        <span>{ShortId(item["buyer"])}</span>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
