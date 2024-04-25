import axios from "axios"
import { VITE_API_URL } from "../../../env"

export const changeUserName = async (username) => {
    try {
        const response = await axios.post(
            VITE_API_URL + "/api/v1/account/update-username",
            {
                username,
            }
        )
        console.log(response.data, "data here")
        console.log(response, " response here")

        return response.data
    } catch (error) {
        console.error("Error fetching user information:", error)
        // Handle error here, maybe show a message to the user
        throw error // Rethrow the error to propagate it upwards
    }
}
