import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const useHeroDetail = () => {
    const [hero, setHero] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios
            .get(`http://localhost:3000/hero/${id}/detail`)
            .then((res) => {
                setHero(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return hero
}
