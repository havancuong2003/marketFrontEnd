import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VITE_API_URL } from "../env";

export const useHistoryTrans = () => {
  const [historyTrans, setHistoryTrans] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(VITE_API_URL + `/api/v1/history-trans/${id}/top-trans`)
      .then((res) => {
        setHistoryTrans(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { historyTrans, setHistoryTrans };
};
