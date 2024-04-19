import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useHistoryTrans = () => {
  const [historyTrans, setHistoryTrans] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/history-trans/${id}/top-trans`)
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
