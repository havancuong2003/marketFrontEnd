import axios from "axios";
import { VITE_API_URL } from "../../../env";

export const handleSelling = async (price, id) => {
  try {
    const response = await axios.patch(
      VITE_API_URL + `/api/v1/hero/${id}/selling`,
      { price: price }
    );
    console.log(response);
  } catch (error) {
    console.error("Error updating price:", error);
  }
};
