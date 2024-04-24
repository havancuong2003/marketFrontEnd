import axios from "axios";
import { VITE_API_URL } from "../../../env";

export const buyHero = async (id: number) => {
  try {
    const response = await axios.patch(VITE_API_URL + `/api/v1/hero/${id}/buy`);
    console.log("Buy Status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Buy Error:", error);
    return { error: "Insufficient balance" };
  }
};
