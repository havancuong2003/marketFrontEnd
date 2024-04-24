import axios from "axios";
import { useEffect, useState } from "react";

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [heros,setHeros] = useState([])
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL+"/api/v1/hero/show-inventory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setInventory(res.data);
        setHeros(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return {
    heros,
    setHeros,
    inventory,
    setInventory,
  };
};
