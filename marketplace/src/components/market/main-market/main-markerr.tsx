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
        <div className="flex w-full h-full">
            <div className=" w-full flex relative">
                <div className={clsx(classes?.marketHeaderSpacing, "w-full  ")}>
                    <div
                        className={clsx(classes?.getSise, "mt-9")}
                        onClick={() => onFilterStatusChange(false)}
                    >
                        <button
                            className={clsx(classes?.bgcolor, "")}
                            //    onClick={clickMe}
                        ></button>
                    </div>

                    <div className={clsx(classes?.herosMarket, "relative")}>
                        <span
                            className={clsx(
                                "text-2xl text-white absolute top-3 left-3"
                            )}
                        >
                            {dataSize} HEROS
                        </span>
                        <img src={button} alt="" />
                    </div>
                    <div className="w-full flex justify-center">
                        <div
                            className={clsx(classes?.backgroundmarket, "")}
                        ></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-y-10 lg:justify-start lg:gap-x-14 lg:ml-28">
                        {heros.map((hero) => (
                            <div
                                onClick={() =>
                                    navigate("/hero/" + hero.id + "/detail")
                                }
                                className={clsx(
                                    "cursor-pointer  flex justify-center items-center lg:block"
                                )}
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

                    <div
                        className={`flex justify-center items-center my-20 text-white ${
                            totalPages <= 1 ? "hidden" : ""
                        }`}
                    >
                        <button
                            className={clsx(
                                " active:bg-orange-500  w-7 h-10 mx-5 mt-2",
                                classes?.prePage
                            )}
                            onClick={goToPreviousPage}
                            title="back"
                        ></button>

                        <div className="text-lg font-bold">
                            <label htmlFor="page">Page</label>

                            <div
                                className={clsx(
                                    classes?.page,
                                    "inline-block text-center"
                                )}
                                title="Current page"
                            >
                                {currentPage}
                            </div>
                        </div>
                        <div className="text-2xl font-bold ml-2">
                            <span>of</span>
                            <span className="ml-4">{totalPages}</span>
                        </div>

                        <button
                            className={clsx(
                                " active:bg-orange-500 w-7 h-10 mx-5 mt-2",
                                classes?.nextPage
                            )}
                            onClick={goToNextPage}
                            title="next"
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
