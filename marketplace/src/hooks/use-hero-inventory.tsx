import axios from "axios"
import { useEffect, useState } from "react"
import { VITE_API_URL } from "../env"

export const useInventory = () => {
    const [inventory, setInventory] = useState([])
    const [heros, setHeros] = useState([])
    useEffect(() => {
        axios
            .get(
                VITE_API_URL +
                    "/api/v1/hero/show-inventory?items_per_page=1&page=3",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                setInventory(res.data)
                setHeros(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return {
        heros,
        setHeros,
        inventory,
        setInventory,
    }
}
