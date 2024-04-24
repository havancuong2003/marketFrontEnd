import axios from "axios";
export const buyHero = async (id: number) => {
  try {
    const response = await axios.patch(`http://localhost:3000/hero/${id}/buy`);
    console.log("Buy Status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Buy Error:", error);
    return { error: "Insufficient balance" };
  }
};
