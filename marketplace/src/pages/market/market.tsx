// Market.js

import { useState } from "react"
import { Header, MainMarkerr, SideBar } from "../../components"
import { useHeroMarket, useSearchMarket } from "../../hooks"
import clsx from "clsx"
type MarketProps = {
    classes?: {
        [key: string]: string
    }
}
export const Market: React.FC<MarketProps> = ({ classes }) => {
    const { heros, setHeros, dataSize, heroBackup } = useHeroMarket()
    console.log("market", heros)
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
    } = useSearchMarket()
    console.log(selectedClass, selectedRank, selectedRace)
    const ITEMS_PER_PAGE = 5 // Số lượng hero mỗi trang

    const [currentPage, setCurrentPage] = useState(1)

    // Tính số trang dựa trên số lượng hero
    const totalPages = Math.ceil(heros.length / ITEMS_PER_PAGE)
    const getHeroesForPage = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return heros.slice(startIndex, endIndex)
    }
    // Xử lý khi chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const filterItems = (selectedFilter) => {
        const { selectedRank, selectedClass, selectedRace } = selectedFilter
        const filteredHeros = heroBackup.filter((hero) => {
            return (
                (!selectedRank || hero.rank === selectedRank.toUpperCase()) &&
                (!selectedClass ||
                    hero.class === selectedClass.toUpperCase()) &&
                (!selectedRace || hero.race === selectedRace.toUpperCase())
            )
        })
        setHeros(filteredHeros)
    }

    const resetFilters = () => {
        setHeros(heroBackup)

        setSelectedRank("")
        setSelectedClass("")
        setSelectedRace("")

        setIsClassOpen(true)
        setIsRankOpen(true)
        setIsRaceOpen(true)
    }

    const [filterOff, setFilterOff] = useState(true)
    const handleClickFilter = (filterstt) => {
        setFilterOff(filterstt)
    }
    console.log(filterOff)

    return (
        <div className="bg-black h-auto">
            <div className="bg-market h-auto relative bg-cover bg-center">
                <div className="w-full">
                    <Header />
                </div>
                <div className="flex">
                    <div
                        className={`${
                            filterOff ? "hidden" : "block"
                        } lg:w-1/3 lg:block`}
                    >
                        <SideBar
                            filterItems={filterItems}
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
                    <div className={clsx(classes?.sizeMarket, "w-2/3")}>
                        <MainMarkerr
                            heros={getHeroesForPage()}
                            dataSize={dataSize}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            onFilterStatusChange={handleClickFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
