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
            <Link to={"/"}>
                <div
                    className={clsx(
                        classes?.buttonBack,
                        "absolute top-28 left-52  text-xl font-bold"
                    )}
                >
                    <ArrowBackIcon />
                    <span>Back</span>
                </div>
                <div className={clsx(classes?.arrow, "absolute ")}>
                    <img src={arrow} alt="" />
                </div>
            </Link>
        </div>
    );
};
