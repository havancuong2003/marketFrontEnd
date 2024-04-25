import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_API_URL } from "../env";

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    useEffect(() => {
        axios
            .get(VITE_API_URL + "/api/v1/hero/show-inventory", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setInventory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        inventory,
        setInventory,
    };
};
