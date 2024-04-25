import { DetailHero } from "../../common/detail-hero";
import button from "../../../assets/img/button.png";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

type MainMarkerrProps = {
    heros: any;
    dataSize: number;
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onFilterStatusChange: (filterstt) => void;
    classes?: {
        [key: string]: string;
    };
};
export const MainMarkerr: React.FC<MainMarkerrProps> = ({
    heros,
    dataSize,
    totalPages,
    currentPage,
    onPageChange,
    classes,
    onFilterStatusChange,
}) => {
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="flex w-[410px] lg:w-full h-full">
            <div className=" w-full flex mt-20">
                <div className="">
                    <div className="flex justify-end ">
                        <div
                            className={clsx(classes?.getSise, "")}
                            onClick={() => onFilterStatusChange(false)}
                        >
                            <button
                                className={clsx(classes?.bgcolor, "")}
                                //    onClick={clickMe}
                            ></button>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="  text-2xl text-white absolute top-3 left-3">
                            {dataSize} HEROS
                        </span>
                        <img src={button} alt="" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 mx-12 my-10 lg:mx-52 lg:gap-40">
                        {heros.map((hero) => (
                            <div
                                onClick={() =>
                                    navigate("/hero/" + hero.id + "/detail")
                                }
                                className="cursor-pointer"
                            >
                                <DetailHero
                                    key={hero.id}
                                    price={hero.price}
                                    hp={hero.hp}
                                    speed={hero.speed}
                                    dps={hero.dps}
                                    atk={hero.power}
                                    race={hero.race}
                                    classess={hero.class}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mb-20 text-red-600 ">
                        <button
                            className={clsx(
                                " active:bg-orange-500 bg-pre w-5 h-10 mx-5",
                                classes?.a
                            )}
                            onClick={goToPreviousPage}
                        ></button>

                        <div className="text-lg font-bold">
                            <label htmlFor="page">Page</label>
                            <input
                                className="border-[#775F52]  rounded-lg p-1 w-5 mx-3"
                                type="text"
                                name="page"
                                id="page"
                                value={currentPage}
                                readOnly
                            />
                        </div>
                        <div className="text-2xl font-bold">
                            <span>of {totalPages}</span>
                        </div>
                        <button
                            className={clsx(
                                " active:bg-orange-500 bg-next w-5 h-10 mx-5",
                                classes?.a
                            )}
                            onClick={goToNextPage}
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
