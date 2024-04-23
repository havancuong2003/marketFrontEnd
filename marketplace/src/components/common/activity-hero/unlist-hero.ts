import axios from "axios";
export const unListHero = async (id: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/hero/${id}/delist`
    );
    console.log("Delist Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delist Error:", error);
  }
};
