import axios from "axios"

export const changeUserName = async (username) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/account/update-username",
            {
                username,
            }
        )

        return response.data
    } catch (error) {
        console.error("Error fetching user information:", error)
        // Handle error here, maybe show a message to the user
        throw error // Rethrow the error to propagate it upwards
    }
}
