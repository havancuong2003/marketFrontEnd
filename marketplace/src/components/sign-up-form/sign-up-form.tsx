import clsx from "clsx"
import { useRegister } from "../../hooks/use-register"
import { Input } from "../common/input"

type SignUpFormProps = {
    classes?: {
        [key: string]: string
    }
}
export const SignUpForm: React.FC<SignUpFormProps> = ({ classes }) => {
    const {
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        email,
        password,
        emailError,
        passwordError,
        usernameError,
        username,
        handleUsernameChange,
    } = useRegister()
    return (
        <div className="my-5 text-sm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="flex justify-between">
                        <span className="text-white text-sm">Username:</span>
                        {usernameError && (
                            <p className="text-sm text-red-500 mx-3">
                                {usernameError}
                            </p>
                        )}
                    </label>

                    <Input
                        type="text"
                        value={username}
                        id="username"
                        onChange={handleUsernameChange}
                        placeholder="Enter your username"
                    />
                    <div className="my-7">
                        <label htmlFor="email" className="flex justify-between">
                            <span className="text-white text-sm">Email:</span>
                            {emailError && (
                                <p className="text-sm text-red-500 mx-3">
                                    {emailError}
                                </p>
                            )}
                        </label>
                        <Input
                            type="email"
                            value={email}
                            id="email"
                            onChange={handleEmailChange}
                            placeholder="cuong123@example.com"
                        />
                    </div>

                    <div className="my-6 ">
                        <label htmlFor="password">
                            <span className="text-white text-sm ">
                                Pass word:
                            </span>
                        </label>
                        <Input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            id="password"
                            placeholder="*********************"
                        />
                    </div>

                    <button
                        type="submit"
                        className={clsx(
                            classes?.posSignUp,
                            "absolute lg:bottom-32 lg:left-16 lg:text-2xl text-white  lg:px-5 lg:py-3 rounded-full cursor-pointer"
                        )}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
