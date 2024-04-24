import { useState } from "react"

export const useSearchMarket = () => {
    const [isRankOpen, setIsRankOpen] = useState(true)
    const [isClassOpen, setIsClassOpen] = useState(true)
    const [isRaceOpen, setIsRaceOpen] = useState(true)

    const [selectedRank, setSelectedRank] = useState("")
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedRace, setSelectedRace] = useState("")

    const onToggleRank = (rank: string) => {
        setSelectedRank(rank)
    }

    const onToggleClass = (classs: string) => {
        setSelectedClass(classs)
    }

    const onToggleRace = (race: string) => {
        setSelectedRace(race)
    }

    const toggleRank = () => {
        if (!isRankOpen) {
            setSelectedRank("")
        }
        setIsRankOpen(!isRankOpen)
    }

    const toggleClass = () => {
        if (!isClassOpen) {
            setSelectedClass("")
        }
        setIsClassOpen(!isClassOpen)
    }

    const toggleRace = () => {
        if (!isRaceOpen) {
            setSelectedRace("")
        }
        setIsRaceOpen(!isRaceOpen)
    }

    const genetic = ["Genenetic", "Non-genetic"]
    const rank = [
        "Warrior",
        "Warmonger",
        "Overseer",
        "Chieftain",
        "Warlord",
        "Elder",
        "War Chief",
        "High Chief",
        "Grand Chief",
    ]
    const classes = ["Air", "Melee", "Range", "Tanker", "Mage"]
    const race = ["Antuk", "Muu", "Mantah", "Montak", "Krakee"]

    return {
        genetic,
        rank,
        classes,
        race,

        isRankOpen,
        isClassOpen,
        isRaceOpen,

        toggleRank,
        toggleClass,
        toggleRace,

        onToggleRank,
        onToggleClass,
        onToggleRace,

        selectedRank,
        selectedClass,
        selectedRace,

        setSelectedClass,
        setSelectedRank,
        setSelectedRace,

        setIsClassOpen,
        setIsRankOpen,
        setIsRaceOpen,
    }
}
