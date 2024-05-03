import { Link } from "react-router-dom";
interface ButtonStartProps {
    data: string;
    to: string;
    className?: string;
}
import input from "../../assets/img/input.png";
export const ButtonStart = ({ data, to, className }: ButtonStartProps) => {
    return (
        <div className="text-white flex relative">
            <Link to={to}>
                <img src={input} className="mx-5" alt="input" />
                <span className={className}>{data}</span>
            </Link>
        </div>
    );
};
