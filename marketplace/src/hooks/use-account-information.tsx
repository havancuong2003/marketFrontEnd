import axios from "axios";
import { useEffect, useState } from "react";

export const useAccountInformation = () => {
  const [account, setAccount] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/account/show-information", {
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
  console.log(account)
  return {
    account,
    setAccount,
  };
};
