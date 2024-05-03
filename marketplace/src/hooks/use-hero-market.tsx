import axios from "axios";
import { useState } from "react";
import { VITE_API_URL } from "../env";
interface Hero {
    rank: string;
    class: string;
    race: string;
}
export const useHeroMarket = () => {
    const [heros, setHeros] = useState<Hero[]>([]);
    const [dataSize, setDataSize] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const herosMarket = (
        page: number,
        itemPerPage: number,
        race: string,
        classs: string,
        rank: string
    ) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios
                    .get(
                        VITE_API_URL +
                            `/api/v1/hero/show-market?page=${page}&items_per_page=${itemPerPage}&race=${race.toUpperCase()}&class=${classs.toUpperCase()}&rank=${rank.toUpperCase()}`
                    )
                    .then((res) => {
                        setHeros(res.data.data);
                        setDataSize(res.data.total);
                        setTotalPage(res.data.lastPage);
                        setLoading(false);
                        setCurrentPage(res.data.currentPage);
                        if (res.data.currentPage > res.data.lastPage) {
                            setCurrentPage(1);
                        }
                        resolve(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            }, 500);
        });
    };

    return {
        heros,
        setHeros,
        dataSize,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        herosMarket,
        totalPage,
    };
};
