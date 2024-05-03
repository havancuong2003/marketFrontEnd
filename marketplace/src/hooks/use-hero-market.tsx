import axios from "axios";
import { useState, useEffect } from "react";
import { VITE_API_URL } from "../env";

export const useHeroMarket = () => {
    const [heros, setHeros] = useState([]);
    const [heroBackup, setHeroBackup] = useState([]);
    const [dataSize, setDataSize] = useState(0); // State để lưu kích thước của dữ liệu
    // const { selectedRank, selectedRace, selectedClass } = useSearchMarket()

    useEffect(() => {
        axios
            .get(VITE_API_URL + "/api/v1/hero/show-market?items_per_page=100")
            .then((res) => {
                setHeros(res.data.data);
                console.log(res.data);
                setHeroBackup(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        setDataSize(heros.length);
    }, [heros]);
    return {
        heros,
        setHeros,
        dataSize,
        heroBackup,
        setHeroBackup,
    };
};
