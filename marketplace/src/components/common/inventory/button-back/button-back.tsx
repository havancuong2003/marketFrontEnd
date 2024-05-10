import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import arrow from "../../../../assets/img/arrow_4.png";

type ButtonBackProps = {
    classes?: {
        [key: string]: string;
    };
};

export const ButtonBack: React.FC<ButtonBackProps> = ({ classes }) => {
    return (
        <div>
            <div
                className={clsx(
                    classes?.buttonBack,
                    "absolute top-24 left-20  text-xl font-bold"
                )}
            >
                <Link to={"/"}>
                    <div>
                        <ArrowBackIcon />
                        <span>Back</span>
                    </div>
                </Link>
            </div>

            <div
                className={clsx(
                    classes?.arrow,
                    "absolute top-24 left-20  text-xl font-bold"
                )}
            >
                <Link to={"/"}>
                    <img src={arrow} alt="" />
                </Link>
            </div>
        </div>
    );
};
