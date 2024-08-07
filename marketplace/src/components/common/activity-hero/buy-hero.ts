import axios, { AxiosError } from "axios";
import { VITE_API_URL } from "../../../env";

export const buyHero = async (id: number,{send}:{send :(val:string)=>void}) => {
    try {
        const response = await axios.patch(
            VITE_API_URL + `/api/v1/hero/${id}/buy`
        );
        send("buy "+id);
        console.log("Buy Status:", response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Buy Error:", error.response?.data.message);
            return { error: error.response?.data.message };
        }
    }
};
