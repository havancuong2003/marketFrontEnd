import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { VITE_API_URL } from "../env"

export const useHeroDetail = () => {
    const [hero, setHero] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios
            .get(VITE_API_URLL + "/api/v1/hero/${id}/detail")
            .then((res) => {
                setHero(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return hero
}
