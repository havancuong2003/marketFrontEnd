import axios from "axios"
import { VITE_API_URL } from "../../env"
export const getInfoUser = async () => {
    try {
        const response = await axios.get(
            VITE_API_URL+"/api/v1/account/show-information"
        )

        return response.data // Return data for further processing if needed
    } catch (error) {
        console.error("Error fetching user information:", error)
        // Handle error here, maybe show a message to the user
        throw error // Rethrow the error to propagate it upwards
    }
}
