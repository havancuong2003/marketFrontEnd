import clsx from "clsx";

type DetailHeroProps = {
    price: number;
    hp: number;
    speed: number;
    dps: number;
    atk: number;
    race: string;
    classess: string;
    classes?: {
        [key: string]: string;
    };
};
export const DetailHero: React.FC<DetailHeroProps> = ({
    price,
    hp,
    speed,
    dps,
    atk,
    race,
    classess,
    classes,
}) => {
    return (
        <div
            className={clsx(
                classes?.size,
                classes?.backgroundHeroCard,
                classes?.textsize,
                "relative "
            )}
        >
            <div className="">
                <div
                    className={clsx(
                        classes?.sizeAvatar,
                        classes?.posAva,
                        classes?.avat,
                        "bg-cover bg-center rounded-lg"
                    )}
                ></div>
            </div>
            <div className={clsx(" absolute bottom-0 lg:text-white")}>
                <div
                    className={clsx(
                        classes?.info,
                        classes?.sizeInfo,
                        "absolute bottom-2 lg:bottom-16  left-3 lg:text-lg"
                    )}
                >
                    <div className={clsx(classes?.setPosHp, "  ml-2")}>
                        <span>HP: {hp}</span>
                    </div>
                    <div className={clsx(classes?.setPosAtk, "  ml-4")}>
                        <span>ATK: {atk}</span>
                    </div>
                </div>
                <div
                    className={clsx(
                        classes?.info,
                        classes?.sizeInfo,
                        "flex absolute bottom-5 lg:bottom-8 right-2  left-5 lg:text-lg"
                    )}
                >
                    <div className={clsx(classes?.setPosSpd, "mx-1  ")}>
                        <span>SPD: {speed}</span>
                    </div>
                    <div className={clsx(classes?.setPosDps, "ml-2  ")}>
                        <span>DPS: {dps}</span>
                    </div>
                </div>
                <div
                    className={clsx(
                        classes?.info,
                        "absolute left-14 bottom-7 lg:bottom-10 lg:left-32"
                    )}
                >
                    <span>{price}</span>
                </div>
                <div className="flex absolute bottom-1 left-3 lg:bottom-1 lg:left-3 lg:text-xl ">
                    <div className={clsx(classes?.info, " mr-8 lg:mr-16")}>
                        <span>{race} </span>
                    </div>
                    <div className={clsx(classes?.info, "lg:ml-4 mb-1")}>
                        <span>{classess}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
