import axios from "axios"
import { useEffect, useState } from "react"
import { VITE_API_URL } from "../env"
export const useActivities = () => {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        axios
            .get(VITE_API_URL + "/api/v1/activity", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setActivities(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    console.log(activities)
    return {
        activities,
        setActivities,
    }
}
