// type ButtonInventoryProps = {
//   component: string[];
//   selectedItem: string;

import clsx from "clsx";

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

export const ButtonInventory: React.FC<ButtonInventoryProps> = ({
  component,
  selectedItem,
  classes,
}) => {
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
