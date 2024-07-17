import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VITE_API_URL } from "../env";

export const useHistoryTrans = () => {
    const [historyTrans, setHistoryTrans] = useState([]);

    const [currPage, setCurrPage] = useState();
    const [lastPage, setLastPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [total, setTotal] = useState();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(VITE_API_URL + `/api/v1/history-trans/${id}/top-trans`)
            .then((res) => {
                setHistoryTrans(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return { historyTrans, setHistoryTrans };
    useEffect(() => {
        axios
            .get(VITE_API_URL + `/api/v1/history-trans/${id}/top-trans`)
            .then((res) => {
                setHistoryTrans(res.data.data);
                setCurrPage(res.data.curPage);
                setLastPage(res.data.lastPage);
                setNextPage(res.data.nextPage);
                setPrevPage(res.data.prevPage);
                setTotal(res.data.total);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return { historyTrans, currPage, lastPage, nextPage, prevPage, total };
};
