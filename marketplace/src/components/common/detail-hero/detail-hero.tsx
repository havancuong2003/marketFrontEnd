import clsx from "clsx";
import okg from "../../../assets/img//OKGToken.png";
import { NumericFormat } from "react-number-format";

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
                        "absolute bottom-2 lg:bottom-16  left-3 lg:text-base"
                    )}
                >
                    <div className={clsx(classes?.setPosHp, "  ml-2")}>
                        <span title="Health point">HP: {hp}</span>
                    </div>
                    <div className={clsx(classes?.setPosAtk, "")}>
                        <span title="Attack" className={clsx(classes?.sizeAtb)}>
                            ATK: {atk}
                        </span>
                    </div>
                </div>
                <div
                    className={clsx(
                        classes?.info,
                        classes?.sizeInfo,
                        "flex absolute bottom-5 lg:bottom-8 right-2  left-5 lg:text-base"
                    )}
                >
                    <div className={clsx(classes?.setPosSpd, "mx-1  ")}>
                        <span title="Speed">SPD: {speed}</span>
                    </div>
                    <div className={clsx(classes?.setPosDps, "ml-2  ")}>
                        <span
                            title="Damage Per Second"
                            className={clsx(classes?.sizeAtb)}
                        >
                            DPS: {dps}
                        </span>
                    </div>
                </div>
                <div
                    className={clsx(
                        classes?.priceInfo,
                        classes?.info,

                        "absolute  bottom-7 lg:bottom-10 justify-between items-center pl-8 lg:mb-1 "
                    )}
                >
                    <img src={okg} className="h-6" />
                    <span title="price" className={clsx(classes?.price)}>
                        <NumericFormat
                            value={price}
                            thousandSeparator=","
                            displayType="text"
                        />
                    </span>
                </div>
                {/* bottom-1 left-3 */}
                <div className="flex absolute  lg:bottom-1 lg:left-3 lg:text-xl ">
                    <div
                        className={clsx(
                            classes?.info,
                            classes?.infoFooterLeft,
                            "mr-8 lg:ml-2 text-center "
                        )}
                    >
                        <span title="Race" className="">
                            {race}{" "}
                        </span>
                    </div>
                    <div
                        className={clsx(
                            classes?.info,
                            classes?.infoFooterRight,
                            "lg:ml-10 mb-1  "
                        )}
                    >
                        <span
                            title="Class"
                            className={clsx(classes?.posFooterRightt)}
                        >
                            {classess}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
