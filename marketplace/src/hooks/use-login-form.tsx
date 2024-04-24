import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { VITE_API_URL } from "../env"

export const useLoginForm = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(
                VITE_API_URL + "/api/v1/auth/login",
                {
                    email,
                    password,
                }
            )
            const token = response.data.tokens.accessToken
            console.log(response)
            console.log(response.data.tokens.accessToken)
            localStorage.setItem("token", token) // Lưu token vào Local Storage
            navigate("/")
        } catch (error) {
            console.error("Login failed: ", error)
            setError("Email or password wrong!!!")
        }
    }

    return {
        email,
        handleEmailChange,
        password,
        handlePasswordChange,
        handleSubmit,
        error,
    }
}
