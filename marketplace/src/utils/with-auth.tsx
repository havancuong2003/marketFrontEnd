import { Navigate } from "react-router-dom"
import { isAuthenticated } from "./is-authenticated"

const WithAuth = ({ component: Component, ...rest }) => {
    return isAuthenticated() ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/auth" replace />
    )
}

export default WithAuth
