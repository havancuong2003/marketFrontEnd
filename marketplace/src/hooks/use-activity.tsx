import axios from "axios"
import { useState, useEffect } from "react"

const useActivity = () =>{
    const [activity, setActivity] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/activity")
        .then((res)=>{
            setActivity(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    return {
        activity,
        setActivity
    }
}
export default useActivity