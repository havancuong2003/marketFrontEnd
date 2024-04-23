import axios from "axios";
import { useEffect, useState } from "react";

export const useActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/activity", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setActivities(res.data);

      })
      .catch((err) => {
        console.log(err); 
      });
  }, []);
  console.log(activities)
  return {
    activities,
    setActivities,
  }; 
};
