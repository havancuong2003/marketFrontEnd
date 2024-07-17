// SideBarMarket.js

import clsx from "clsx";
import { useSearchMarket } from "../../../hooks/use-search-market";
import { Filter } from "../filter";

type SideBarProps = {
    classes?: {
        [key: string]: string;
    };
    resetFilters: () => void;
    toggleRank: (item: any) => void;
    toggleClass: (item: any) => void;
    toggleRace: (item: any) => void;
    isRankOpen: boolean;
    isClassOpen: boolean;
    isRaceOpen: boolean;
    selectedRank: string;
    selectedClass: string;
    selectedRace: string;
    onToggleRank: (item: any) => void;
    onToggleClass: (item: any) => void;
    onToggleRace: (item: any) => void;
    filterStatus: (filterstt) => void;
};
export const SideBar: React.FC<SideBarProps> = ({
    classes,
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
    const searchMarket = useSearchMarket();
    return (
        <div className="lg:block relative">
            <div className={clsx(classes?.showFilter, "h-auto")}>
                <div
                    className={clsx(
                        classes?.closeFilter,
                        "text-2xl text-white lg:hidden absolute lg:top-10 right-5"
                    )}
                    onClick={() => filterStatus(true)}
                >
                    X
                </div>
                <div
                    className={clsx(
                        classes?.setOpacity,
                        "lg:block bg-[#1A140E] lg:bg-opacity-70 lg:mt-5 rounded-xl "
                    )}
                >
                    <div className="lg:mt-10">
                        <span
                            className={clsx(
                                classes?.filterHeader,
                                "text-2xl text-white lg:ml-12"
                            )}
                        >
                            Filters
                        </span>
                        <button
                            className="text-[#DA8B14] mx-5 "
                            onClick={() => resetFilters()}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-[390px]">
                            <Filter
                                isClick={isRankOpen}
                                component={searchMarket.rank}
                                toggle={(item) => {
                                    toggleRank(item);
                                }}
                                headerFilter="Rank"
                                onToggle={(item) => {
                                    onToggleRank(item);
                                }}
                                selectedItem={selectedRank}
                            />

                            <Filter
                                isClick={isClassOpen}
                                component={searchMarket.classess}
                                toggle={(item) => {
                                    toggleClass(item);
                                }}
                                headerFilter="Class"
                                onToggle={(item) => {
                                    onToggleClass(item);
                                }}
                                selectedItem={selectedClass}
                            />

                            <Filter
                                isClick={isRaceOpen}
                                component={searchMarket.race}
                                toggle={(item) => {
                                    toggleRace(item);
                                }}
                                headerFilter="Race"
                                onToggle={(item) => {
                                    onToggleRace(item);
                                }}
                                selectedItem={selectedRace}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
