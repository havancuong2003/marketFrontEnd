// components/LoginForm.js
import useLoginForm from "../hooks/use-login-form"
import Input from "./common/Input"

const LoginForm = () => {
    const {
        email,
        handleEmailChange,
        password,
        handlePasswordChange,
        handleSubmit,
        error,
    } = useLoginForm()

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-12">
                    <label htmlFor="email">
                        <span className="text-white">My Email:</span>
                        {error && <p className="text-red-500">{error}</p>}
                    </label>

                    <Input
                        type="email"
                        value={email}
                        id="email"
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="my-10">
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
                    className="absolute bottom-32 left-16 text-2xl text-white  px-5 py-3 rounded-full cursor-pointer w-[400px]"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
