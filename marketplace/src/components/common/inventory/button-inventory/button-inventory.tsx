// type ButtonInventoryProps = {
//   component: string[];
//   selectedItem: string;

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

//   classes?: {
//     [key: string]: string;
//   };
// };

type ButtonInventoryProps = {
  component: string[];
  selectedItem: string;
  classes?: {
    [key: string]: string;
  };
};
const component = ["Inventory", "Activities","Profile settings"];
export const ButtonInventory: React.FC<ButtonInventoryProps> = ({
  selectedItem,
  classes,
  
}) => {
  const navigate = useNavigate();
  return (
    <div>
      {component.map((item, index) => (
        <div
          key={index}
          className={`${
            item === selectedItem ? "" : "rounded-lg p-3 hover:bg-yellow-900"
          } rounded-lg p-3`}
        >
          <button
            onClick={item === "Profile settings" ? () => navigate("/profile") : () => navigate("/" + item)} 
            className={clsx(
              classes?.fonttext, // Lớp tùy chỉnh
              item === selectedItem
                ? "bg-[#DA8B14] text-[#423429]" // Nếu item được chọn
                : "bg-[#423429] text-[#B7A284]", // Nếu item không được chọn
              "w-full", // Lớp bổ sung
              "p-2", // Lớp bổ sung
              "rounded-md" // Lớp bổ sung
            )}
          >
            {item}
          </button>
        </div>
      ))}
    </div>
  );
};
