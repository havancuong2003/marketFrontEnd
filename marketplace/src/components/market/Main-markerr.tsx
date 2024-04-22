<<<<<<< HEAD
import { DetailHero } from "../common/detail-hero"
import button from "../../assets/img/button.png"
import { useNavigate } from "react-router-dom"
=======
import { DetailHero } from "../common/Detail-hero"
import button from "../../assets/img/button.png"
>>>>>>> parent of c09efe0 (add:add responsive)

export const MainMarkerr = ({
    heros,
    dataSize,
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

<<<<<<< HEAD
    const navigate = useNavigate()
=======
>>>>>>> parent of c09efe0 (add:add responsive)
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <div className=" flex-1 w-64 ">
            <div className="relative  mt-36 ml-20">
                <span className="absolute top-3 left-3 text-2xl text-white">
                    {dataSize} HEROS
                </span>
                <img src={button} alt="" />
            </div>
            <div className="grid grid-cols-3 gap-4 ml-32 mt-20 mb-14">
                {heros.map((hero) => (
<<<<<<< HEAD
                    <div
                        onClick={() => navigate("/hero/" + hero.id + "/detail")}
                    >
                        <DetailHero
                            key={hero.id}
                            price={hero.price}
                            hp={hero.hp}
                            speed={hero.speed}
                            dps={hero.dps}
                            atk={hero.power}
                            race={hero.race}
                            classes={hero.class}
                        />
                    </div>
=======
                    <DetailHero
                        key={hero.id}
                        price={hero.price}
                        hp={hero.hp}
                        speed={hero.speed}
                        dps={hero.dps}
                        atk={hero.power}
                        race={hero.race}
                        classes={hero.class}
                    />
>>>>>>> parent of c09efe0 (add:add responsive)
                ))}
            </div>

            <div className="flex justify-center items-center mb-20 text-red-600">
                <button
                    className="bg-pre bg-cover bg-center h-[60px] w-[40px] mx-10 active:bg-orange-500"
                    onClick={goToPreviousPage}
                ></button>

                <div className="text-2xl font-bold">
                    <label htmlFor="page">Page</label>
                    <input
                        className=" border-[#775F52] border-[3px] rounded-lg px-3 mx-5 w-[80px]"
                        type="text"
                        name="page"
                        id="page"
                        value={currentPage}
                    />
                </div>
                <div className="text-2xl font-bold">
                    <span>of {totalPages}</span>
                </div>
                <button
                    className="bg-next bg-cover bg-center h-[60px] w-[40px] mx-10 p-3  active:bg-orange-500"
                    onClick={goToNextPage}
                ></button>
            </div>
        </div>
    )
}
