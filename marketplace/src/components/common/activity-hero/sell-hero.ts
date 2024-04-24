import axios from "axios";

export const handleSelling = async (price, id) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/hero/${id}/selling`,
      { price: price }
    );
    console.log(response);
  } catch (error) {
    console.error("Error updating price:", error);
  }
};
