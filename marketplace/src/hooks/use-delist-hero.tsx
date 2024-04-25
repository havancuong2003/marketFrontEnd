import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { VITE_API_URL } from "../env";

// Tạo custom hook dùng để delist hero
export const useDelistHero = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hàm để delist hero
  const delist = async () => {
    try {
      const response = await axios.patch(
        VITE_API_URL + `/api/v1/hero/${id}/delist`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Đính token vào header
          },
        }
      );
      console.log("Delist Success:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Delist Error:", error);
    }
  };

  return { delist }; // Trả về hàm delist để dùng ở nơi khác
};
