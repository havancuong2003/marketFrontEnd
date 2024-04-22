import axios from "axios";
import { useEffect, useState } from "react";

const useInventory = async () => {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/hero/show-inventory",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,}
          }
      )
      .then((res) => {
        setInventory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
  }, [inventory]);
  return {
    inventory,
    setInventory,
  };
};
export default useInventory;
