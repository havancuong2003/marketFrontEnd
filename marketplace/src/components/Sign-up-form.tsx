import useRegister from "../hooks/use-register"
import Input from "./common/Input"

const SignUpForm = () => {
    const {
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        email,
        password,
        error,
        username,
        handleUsernameChange,
    } = useRegister()
    return (
        <div className="my-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">
                        <span className="text-white">Username:</span>
                        {error && <p className="text-red-500">{error}</p>}
                    </label>

                    <Input
                        type="text"
                        value={username}
                        id="username"
                        onChange={handleUsernameChange}
                        placeholder="Enter your username"
                    />
                    <div className="my-7">
                        <label htmlFor="email">
                            <span className="text-white">Email:</span>
                        </label>
                        <Input
                            type="email"
                            value={email}
                            id="email"
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="my-6">
                        <label htmlFor="password">
                            <span className="text-white ">Pass word:</span>
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
                        className="absolute bottom-32 left-16 text-2xl text-white  px-5 py-3 rounded-full cursor-pointer w-[400px]"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
