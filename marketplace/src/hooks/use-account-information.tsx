import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_API_URL } from "../env";

export const useAccountInformation = () => {
    const [account, setAccount] = useState([]);
    useEffect(() => {
        axios
            .get(VITE_API_URL + "/api/v1/account/show-information", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setAccount(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        account,
        setAccount,
    };
};
