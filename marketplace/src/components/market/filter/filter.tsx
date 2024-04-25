// Filter.js
type FilterProps = {
    toggle: (item: any) => void
    component: string[]
    isClick: boolean
    headerFilter: string
    onToggle: (item: string) => void
    selectedItem: string
    classes?: {
        [key: string]: string
    }
}
export const Filter: React.FC<FilterProps> = ({
    toggle,
    component,
    isClick,
    headerFilter,
    onToggle,
    selectedItem,
}) => {
    return (
        <div className="border-t-4 border-white m-5">
            <span
                className={`text-2xl cursor-pointer text-white  rounded-lg hover:bg-red-500 mx-5`}
                onClick={toggle}
            >
                {headerFilter}
            </span>
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
    )
}
