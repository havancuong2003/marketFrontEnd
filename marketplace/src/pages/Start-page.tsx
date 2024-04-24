import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
interface ButtonStartProps {
    component: React.ReactNode
    p: string
}
export const StartPage = ({ component, p }: ButtonStartProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard")
        }
    })
    return (
        <div className="h-screen flex justify-center items-center rounded-lg bg-bglogin bg-cover bg-center ">
            <div className="bg-login w-[669px] h-[629px] flex justify-center relative">
                <div
                    className=" w-[50px] h-[50px] absolute top-0 right-0 cursor-pointer"
                    onClick={() => navigate("/auth")}
                ></div>
                <div className="relative top-16">
                    <h1 className="text-white text-3xl font-bold my-3 text-center">
                        YOU ARE ALMOST THERE!
                    </h1>
                    <p className="text-white text-lg text-center">{p}</p>
                    {component}
                </div>
            </div>
        </div>
    )
}
