import { format, differenceInHours } from "date-fns";
import { ShortId } from "../../services";
import { Tooltip } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import axios from "axios";
import { VITE_API_URL } from "../../env";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CopyText } from "../common";
import clsx from "clsx";
import { HistoryTran } from "../../models";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

type HistoryTransProps = {
    classes?: {
        [key: string]: string;
    };
    heroId: number;
};

export const HistoryTrans: React.FC<HistoryTransProps> = ({
    heroId,
    classes,
}) => {
    const [searchParams] = useSearchParams();
    const [historyTrans, setHistoryTrans] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    // const [nextPage, setNextPage] = useState();
    // const [prevPage, setPrevPage] = useState();
    const [lastPage, setLastPage] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        let page = Number(searchParams.get("page"));
        console.log(page);
        const params = page ? { page: Number(page) } : {};
        if (isNaN(page)) page = 1;
        setCurrPage(page);
        axios
            .get(
                VITE_API_URL + "/api/v1/history-trans/" + heroId + "/top-trans",
                { params }
            )
            .then((res) => {
                setHistoryTrans(res.data.data);
                setLastPage(res.data.lastPage);
                setTotal(res.data.total);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [searchParams]);

    // const handlePageChange = (event: any, page: number) => {
    //     navigate("?page=" + page);
    //     setCurrPage(page);
    // };

    const navigate = useNavigate();
    const formatDate = (date: Date): string => {
        const formattedDate = format(date, "MMM dd yyyy HH:mm:ss");
        return formattedDate;
    };

    const time = Date();

    return (
        <div className={clsx(classes?.container, "flex justify-center")}>
            <div className="w-7/12  bg-[#170A02] mt-10 mb-10 tex-sm rounded-xl">
                <table className=" w-full table-auto border-collapse ">
                    <thead className="text-dark-yellow  border-light-brown border-opacity-20 mt-5 mb-5 flex mx-20 ">
                        <tr className="flex w-full justify-between   ">
                            <th className="w-1/4 text-left">
                                <span>Time</span>
                            </th>
                            <th className="w-1/4  text-left">
                                <span>Value</span>
                            </th>
                            <th className="w-1/4  text-left">
                                <span>Seller</span>
                            </th>
                            <th className="w-1/4  text-left">
                                <span>Buyer</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-main px-20 mt-5 mb-5 flex flex-col  overflow-y-scroll custom-scrollbar h-96">
                        {historyTrans.map((item: HistoryTran) => (
                            <tr
                                key={item.id}
                                className="border-b border-light-brown border-opacity-20 flex w-full justify-between"
                            >
                                <td className=" my-5 w-1/4 text-left">
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
                                <td className=" my-5 w-1/4 text-left">
                                    <span>{item["value"]} OKG</span>
                                </td>
                                <td className=" my-5 w-1/4 text-left">
                                    <Tooltip
                                        title={item["seller"]}
                                        placement="top"
                                        arrow
                                    >
                                        <span>{ShortId(item["seller"])}</span>
                                    </Tooltip>
                                    <CopyText text={item["seller"]} />
                                </td>
                                <td className=" my-5 w-1/4 text-left">
                                    <Tooltip
                                        title={item["buyer"]}
                                        placement="top"
                                        arrow
                                    >
                                        <span>{ShortId(item["buyer"])}</span>
                                    </Tooltip>
                                    <CopyText text={item["buyer"]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-dark-yellow  border-light-brown border-opacity-20 mt-5 mb-5 flex ">
                        <tr className="flex w-full justify-between mx-20">
                            <td>
                                <span>Total: {total} results</span>
                            </td>
                            <td>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={lastPage}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                slots={{
                                                    previous: ArrowBackIcon,
                                                    next: ArrowForwardIcon,
                                                }}
                                                {...item}
                                            />
                                        )}
                                        page={currPage}
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#B7A284",
                                            },
                                        }}
                                        color="secondary"
                                        variant="outlined"
                                        onChange={(e, page) => {
                                            //handlePageChange(event, page);
                                            console.log(e);
                                            navigate("?page=" + page);
                                        }}
                                        shape="rounded"
                                    />
                                </Stack>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
