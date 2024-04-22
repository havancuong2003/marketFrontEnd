// SideBarMarket.js

import clsx from "clsx"
import { useSearchMarket } from "../../../hooks/use-search-market"
import { Filter } from "../filter/filter"

type SideBarProps = {
    classes?: {
        [key: string]: string
    }
    filterItems: string[]
    resetFilters: () => void
    toggleRank: () => void
    toggleClass: () => void
    toggleRace: () => void
    isRankOpen: boolean
    isClassOpen: boolean
    isRaceOpen: boolean
    selectedRank: string
    selectedClass: string
    selectedRace: string
    onToggleRank: () => void
    onToggleClass: () => void
    onToggleRace: () => void
    filterStatus: (filterstt) => void
}
export const SideBar: React.FC<SideBarProps> = ({
    classes,
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
    filterStatus,
}) => {
    const searchMarket = useSearchMarket()
    return (
        <div className="lg:block relative">
            <div className={clsx(classes?.showFilter, "h-auto")}>
                <div
                    className={clsx(
                        classes?.closeFilter,
                        "text-2xl text-white lg:hidden absolute top-10 right-5"
                    )}
                    onClick={() => filterStatus(true)}
                >
                    X
                </div>
                <div
                    className={clsx(
                        classes?.setOpacity,
                        "lg:block bg-[#1A140E] lg:bg-opacity-70 mt-5 rounded-xl "
                    )}
                >
                    <div className="mt-10">
                        <span className="text-2xl text-white ">Filters</span>
                        <button
                            className="text-[#DA8B14] mx-5 "
                            onClick={() => resetFilters()}
                        >
                            Reset
                        </button>
                    </div>

                    <Filter
                        isClick={isRankOpen}
                        component={searchMarket.rank}
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
                        component={searchMarket.classess}
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
                        component={searchMarket.race}
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
        </div>
    )
}
