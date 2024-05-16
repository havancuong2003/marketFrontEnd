import clsx from "clsx";
import logo from "../../../assets/img/logo_footer.png";
import { useNavigate } from "react-router-dom";

type FooterProps = {
    classes?: {
        [key: string]: string;
    };
};

export const Footer: React.FC<FooterProps> = ({ classes }) => {
    const navigate = useNavigate();
    return (
        <footer>
            <div className={clsx(classes?.footer,"flex justify-between text-sm bg-black text-white py-5")}>
                <div className={clsx(classes?.rightFooter)}>
                    <div className="mx-5">
                        <span>Team and Conditions</span>
                    </div>
                    <div className="mx-5">
                        <span>Privacy</span>
                    </div>
                </div>
                <div className={clsx(classes?.rightFooterLogo)}>
                    <img src={logo} alt="" />
                </div>
                <div className={clsx(classes?.leftFooter,"flex cursor-pointer")} onClick={()=>navigate('/')}>
                    <span> 2021 CROS-All Right</span>
                </div>
            </div>
        </footer>
    );
};
