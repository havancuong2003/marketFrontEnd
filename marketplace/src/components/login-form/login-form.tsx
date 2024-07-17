// components/LoginForm.js
import clsx from "clsx";
import { useLoginForm } from "../../hooks/use-login-form";
import { Input } from "../common/input";

type LoginFormProps = {
    classes?: {
        [key: string]: string;
    };
};
export const LoginForm: React.FC<LoginFormProps> = ({ classes }) => {
    const {
        email,
        handleEmailChange,
        password,
        handlePasswordChange,
        handleSubmit,
        error,
    } = useLoginForm();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className=" my-3 lg:my-12 ">
                    <label htmlFor="email">
                        <span className="text-white">My Email:</span>
                        {error && <p className="text-red-500">{error}</p>}
                    </label>

                    <Input
                        type="email"
                        value={email}
                        id="email"
                        onChange={handleEmailChange}
                        placeholder="cuong123@example.com"
                    />
                </div>
                <div className="my-6 lg:my-10 ">
                    <label htmlFor="password">
                        <span className="text-white ">Pass word:</span>
                    </label>
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        id="password"
                        placeholder="*****************"
                    />
                </div>
                <button
                    type="submit"
                    className={clsx(
                        classes?.posSubmit,
                        classes?.bgloginform,
                        " lg:text-2xl text-white  rounded-full cursor-pointer "
                    )}
                >
                    Login
                </button>
            </form>
        </div>
    );
};
