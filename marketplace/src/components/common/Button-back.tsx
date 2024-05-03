import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ButtonBack = () => {
    return (
        <div className="">
            <Link
                className="absolute top-14 left-20  text-xl font-bold"
                to={"/"}
            >
                <ArrowBackIcon />
                <span>Back</span>
            </Link>
        </div>
    );
};
