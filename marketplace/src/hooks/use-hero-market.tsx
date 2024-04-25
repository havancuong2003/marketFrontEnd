import axios from "axios"
import { useState, useEffect } from "react"
import { VITE_API_URL } from "../env"
interface Hero {
    rank: string
    class: string
    race: string
    // Thêm các thuộc tính khác nếu cần
}
export const useHeroMarket = () => {
    const [heros, setHeros] = useState<Hero[]>([]) // Chỉ định kiểu dữ liệu cho heros
    const [heroBackup, setHeroBackup] = useState<Hero[]>([]) // Chỉ định kiểu dữ liệu cho heroBackup
    const [dataSize, setDataSize] = useState<number>(0) // Chỉ định kiểu dữ liệu cho dataSize

    useEffect(() => {
        axios
            .get(VITE_API_URL + "/api/v1/hero/show-market?items_per_page=17")
            .then((res) => {
                setHeros(res.data.data)
                setHeroBackup(res.data.data)
                console.log("daata heroo", res.data)
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
