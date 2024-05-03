import axios, { AxiosError } from "axios";
import { VITE_API_URL } from "../../../env";

export const buyHero = async (id: number) => {
    try {
        const response = await axios.patch(
            VITE_API_URL + `/api/v1/hero/${id}/buy`
        );

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Buy Error:", error);

            return { error: error.response?.data.message };
        }
    }
};
