// Market.js

import { useEffect, useState } from "react";
import { Header } from "../../components/common/header";
import { MainMarkerr } from "../../components/market/main-market";
import { SideBar } from "../../components/market/side-bar-market";
import { useHeroMarket } from "../../hooks/use-hero-market";
import { useSearchMarket } from "../../hooks/use-search-market";
import clsx from "clsx";
type MarketProps = {
    classes?: {
        [key: string]: string;
    };
};

export const Market: React.FC<MarketProps> = ({ classes }) => {
    const {
        heros,
        setHeros,
        dataSize,
        loading,
        setLoading,
        herosMarket,
        totalPage,
        currentPage,
        setCurrentPage,
    } = useHeroMarket();

    const {
        isRankOpen,
        isClassOpen,
        isRaceOpen,

        toggleRank,
        toggleClass,
        toggleRace,

        selectedRank,
        selectedClass,
        selectedRace,

        setSelectedRank,
        setSelectedClass,
        setSelectedRace,

        setIsClassOpen,
        setIsRankOpen,
        setIsRaceOpen,

        onToggleClass,
        onToggleRank,
        onToggleRace,
    } = useSearchMarket();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        herosMarket(
            currentPage,
            8,
            selectedRace,
            selectedClass,
            selectedRank
        ).then((data: any) => {
            setHeros(data.data);
        });
    }, [currentPage, dataSize, selectedRank, selectedClass, selectedRace]);
    const resetFilters = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRank("");
            setSelectedClass("");
            setSelectedRace("");
            setIsClassOpen(true);
            setIsRankOpen(true);
            setIsRaceOpen(true);

            setLoading(false);
        }, 1000);
    };

    const [filterOff, setFilterOff] = useState(true);
    const handleClickFilter = (filterstt) => {
        setFilterOff(filterstt);
    };

    return (
        <div className="bg-black h-auto pb-40">
            <div className="bg-market h-auto relative bg-cover bg-center">
                <div className="w-full">
                    <Header />
                </div>
                <div className="lg:flex w-full mt-14">
                    <div
                        className={clsx(
                            classes?.sizeSidebar,
                            `${filterOff ? "hidden" : "block"}  lg:block`
                        )}
                    >
                        <SideBar
                            //  filterItems={filterItems}
                            resetFilters={resetFilters}
                            toggleRank={toggleRank}
                            toggleClass={toggleClass}
                            toggleRace={toggleRace}
                            isRankOpen={isRankOpen}
                            isClassOpen={isClassOpen}
                            isRaceOpen={isRaceOpen}
                            selectedClass={selectedClass}
                            selectedRank={selectedRank}
                            selectedRace={selectedRace}
                            onToggleClass={onToggleClass}
                            onToggleRank={onToggleRank}
                            onToggleRace={onToggleRace}
                            filterStatus={handleClickFilter}
                        />
                    </div>

                    <div className={clsx(classes?.sizeMarket, "lg:w-2/3")}>
                        {loading ? (
                            <div className="flex items-center justify-center h-screen">
                                <div className="spinner"></div>
                                <span className="ml-2 text-2xl text-white">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <MainMarkerr
                                heros={heros}
                                dataSize={dataSize}
                                totalPages={totalPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                onFilterStatusChange={handleClickFilter}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
