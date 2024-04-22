import axios from "axios";
import { useEffect, useState } from "react";

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/hero/show-inventory", {
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
