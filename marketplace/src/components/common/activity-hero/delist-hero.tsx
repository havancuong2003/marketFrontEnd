import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axios-instrance";
// Tạo custom hook dùng để delist hero
export const DelistHero = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hàm để delist hero
  const delist = async () => {
    try {
      const response = await axiosInstance.patch(`/hero/${id}/delist`);
      console.log("Delist Success:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Delist Error:", error);
    }
  };

  return { delist };
};
