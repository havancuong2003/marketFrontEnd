import { Button } from "@mui/material";
import clsx from "clsx";
import { unListHero } from "../activity-hero";
import { useNavigate } from "react-router-dom";
import { UUID } from "crypto";
import { Status } from "../../../types";
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';
import Swal from "sweetalert2";
type DetailHeroProps = {
    user_id:UUID,
    owner:UUID,
    id:number;
    price: number;
    hp: number;
    speed: number;
    dps: number;
    atk: number;
    race: string;
    status: number;
    classess: string;
    send: (val: string) => void;
    classes?: {
        [key: string]: string;
    };
};
export const DetailHero: React.FC<DetailHeroProps> = ({
    user_id,
    owner,
    id,
    price,
    hp,
    speed,
    dps,
    atk,
    race,
    status,
    classess,
    send,
    classes,
}) => {
    const navigate = useNavigate();

    const handelUnList = async (id: number) => {
        Swal.fire({
            title: "DELIST ITEM?",
            text: "This item will be instantly REMOVED from Marketplace and return to your Inventory",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "DELISTED!",
                    text: "Your hero had been delisted",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                unListHero(id, { send });
                navigate("/inventory");    
            }

        });
    };

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
                >
                    {
                        owner === user_id && status === Status.MARKET? (
                            <div className="flex w-full">
                                <div  className="flex justify-end flex-grow mt-2">
                                    <Button
                             
                                        onClick={() => {
                                            handelUnList(id);
                                        }}
                                    >
                                        <RemoveShoppingCartTwoToneIcon></RemoveShoppingCartTwoToneIcon>
                                    </Button>
                                </div>
                                
                            </div>
                        ):("")
                    }
                    
                </div>
            </div>
            <div
                className={clsx(" absolute bottom-0 lg:text-white cursor-pointer")}
                onClick={()=>navigate("/hero/" + id + "/detail")}
            >
                <div
                    className={clsx(
                        classes?.info,
                        classes?.sizeInfo,
                        "absolute bottom-2 lg:bottom-16  left-3 lg:text-lg"
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
                        "flex absolute bottom-5 lg:bottom-8 right-2  left-5 lg:text-lg"
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
                        classes?.info,
                        "absolute left-14 bottom-7 lg:bottom-10 lg:left-32"
                    )}
                >
                    <span title="price" className={clsx(classes?.price)}>
                        {price}
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
