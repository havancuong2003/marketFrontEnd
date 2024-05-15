import axios from "axios";
import { VITE_API_URL } from "../../../env";
export const unListHero = async (id: number,{send}:{send :(val:string)=>void}) => {
  try {
    const response = await axios.patch(
      VITE_API_URL + `/api/v1/hero/${id}/delist`
    );
    send("unlist "+id);
    console.log("Delist Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delist Error:", error);
  }
};
