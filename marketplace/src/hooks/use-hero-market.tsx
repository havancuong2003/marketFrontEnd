import axios from "axios";
import { useState, useEffect } from "react";

export const useHeroMarket = () => {
  const [heros, setHeros] = useState([]);
  const [heroBackup, setHeroBackup] = useState([]);
  const [dataSize, setDataSize] = useState(0); // State để lưu kích thước của dữ liệu
  // const { selectedRank, selectedRace, selectedClass } = useSearchMarket()

<<<<<<< HEAD
  useEffect(() => {
    axios
      .get("http://localhost:3000/hero/show-market")
      .then((res) => {
        setHeros(res.data);
        setHeroBackup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setDataSize(heros.length);
  }, [heros]);
  return {
    heros,
    setHeros,
    dataSize,
    heroBackup,
    setHeroBackup,
  };
};
=======
    useEffect(() => {
        axios
            .post("http://localhost:3000/hero/listmarket")
            .then((res) => {
                setHeros(res.data)
                setHeroBackup(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        setDataSize(heros.length)
    }, [heros])
    return {
        heros,
        setHeros,
        dataSize,
        heroBackup,
        setHeroBackup,
    }
}
>>>>>>> parent of 223ec22 (feat/cuong: update responsive login sign up)
