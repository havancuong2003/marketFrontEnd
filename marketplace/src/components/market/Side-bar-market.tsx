// SideBarMarket.js

import useSearchMarket from "../../hooks/use-search-market"
import Filter from "./Filter"

const SideBar = ({
    filterItems,
    resetFilters,
    toggleRank,
    toggleClass,
    toggleRace,
    isRankOpen,
    isClassOpen,
    isRaceOpen,
    selectedRank,
    selectedClass,
    selectedRace,
    onToggleRank,
    onToggleClass,
    onToggleRace,
}) => {
    const { rank, classes, race } = useSearchMarket()
    return (
        <div className=" h-auto flex justify-center m-20 px-2">
            <div className="w-[468px] my-10 bg-[#1A140E] bg-opacity-70 mt-5 rounded-xl">
                <div className="mt-10">
                    <span className="text-2xl text-white mx-5">Filters</span>
                    <button
                        className="text-[#DA8B14] mx-5"
                        onClick={() => resetFilters()}
                    >
                        Reset
                    </button>
                </div>

                <Filter
                    isClick={isRankOpen}
                    component={rank}
                    toggle={(item) => {
                        toggleRank(item)
                        filterItems({
                            selectedRank: "",
                            selectedClass,
                            selectedRace,
                        })
                    }}
                    headerFilter="Rank"
                    onToggle={(item) => {
                        onToggleRank(item)
                        filterItems({
                            selectedRank: item,
                            selectedClass,
                            selectedRace,
                        })
                    }}
                    selectedItem={selectedRank}
                />

                <Filter
                    isClick={isClassOpen}
                    component={classes}
                    toggle={(item) => {
                        toggleClass(item)
                        filterItems({
                            selectedRank,
                            selectedClass: "",
                            selectedRace,
                        })
                    }}
                    headerFilter="Class"
                    onToggle={(item) => {
                        onToggleClass(item)
                        filterItems({
                            selectedRank,
                            selectedClass: item,
                            selectedRace,
                        })
                    }}
                    selectedItem={selectedClass}
                />

                <Filter
                    isClick={isRaceOpen}
                    component={race}
                    toggle={(item) => {
                        toggleRace(item)
                        filterItems({
                            selectedRank,
                            selectedClass,
                            selectedRace: "",
                        })
                    }}
                    headerFilter="Race"
                    onToggle={(item) => {
                        onToggleRace(item)
                        filterItems({
                            selectedRank,
                            selectedClass,
                            selectedRace: item,
                        })
                    }}
                    selectedItem={selectedRace}
                />
            </div>
        </div>
    )
}

export default SideBar
