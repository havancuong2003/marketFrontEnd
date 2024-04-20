

export const ButtonInventory = ({
    component,
    selectedItem,
}) => {
    return (
        <div>
        {component.map((item, index) => (
            <div
                key={index}
                className={`${
                    item === selectedItem
                        ? ""
                        : "rounded-lg p-3 hover:bg-yellow-900"
                } rounded-lg p-3`}
            >
                <button
                    className={`${
                        item === selectedItem
                            ? "bg-[#DA8B14] text-black"
                            : "bg-[#423429] text-yellow-700"
                    } w-full p-2 rounded-md`}
                >
                    {item}
                </button>
            </div>
        ))}
    </div>
    )
}


