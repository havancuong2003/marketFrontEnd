import clsx from "clsx";

// Filter.js
type FilterProps = {
    toggle: (item: any) => void;
    component: string[];
    isClick: boolean;
    headerFilter: string;
    onToggle: (item: string) => void;
    selectedItem: string;
    classes?: {
        [key: string]: string;
    };
};
export const Filter: React.FC<FilterProps> = ({
    toggle,
    component,
    isClick,
    headerFilter,
    onToggle,
    selectedItem,
    classes,
}) => {
    return (
        <div className={clsx(classes?.line, "")}>
            <span
                className={`text-2xl cursor-pointer text-white  rounded-lg hover:bg-red-500 mx-3 inline-block mt-2`}
                onClick={toggle}
            >
                {headerFilter}
            </span>
            <div className="grid grid-cols-2 gap-4 justify-center">
                {component.map((item, index) => (
                    <div
                        key={index}
                        className={`${
                            isClick ? "" : "hidden"
                        } rounded-lg p-3 hover:bg-violet-600`}
                    >
                        <button
                            onClick={() => onToggle(item)}
                            className={`${
                                item === selectedItem
                                    ? "bg-[#DA8B14] text-black"
                                    : "bg-[#423429] text-white"
                            } w-full p-2 rounded-md`}
                        >
                            {item}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
