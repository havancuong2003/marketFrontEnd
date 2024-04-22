import axios from "axios"
import { useState, useEffect } from "react"

export const useHeroMarket = () => {
    const [heros, setHeros] = useState([])
    const [heroBackup, setHeroBackup] = useState([])
    const [dataSize, setDataSize] = useState(0) // State để lưu kích thước của dữ liệu
    // const { selectedRank, selectedRace, selectedClass } = useSearchMarket()

    useEffect(() => {
        axios
            .get("http://localhost:3000/hero/show-market")
            .then((res) => {
                setHeros(res.data)
                setHeroBackup(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        setDataSize(heros.length)
    }, [heros])
    return {
        heros,
        setHeros,
        dataSize,
        heroBackup,
        setHeroBackup,
    }
}
