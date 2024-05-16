import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_API_URL } from "../env";
import { Account } from "../models/account";

export const useAccountInformation = () => {
    const [account, setAccount] = useState({} as Account);
    useEffect(() => {
        axios
            .get(VITE_API_URL + "/api/v1/account/show-information", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setAccount(res.data);
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
