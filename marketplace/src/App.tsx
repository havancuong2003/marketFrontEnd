import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Test from "./components/test"
import { StartPage } from "./pages/start-page"
import { WithAuth } from "./utils/with-auth"
import { Start } from "./pages/start"
import { SignUpForm } from "./components/sign-up-form"
import { LoginForm } from "./components/login-form"
import { Market } from "./pages/market/market"
import { HeroDetail } from "./pages"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <StartPage
                            p="Login to start your journey"
                            component={<LoginForm />}
                        />
                    }
                />
                <Route path="/auth" element={<Start />} />
                <Route path="/hero/" element={<HeroDetail />} />
                <Route path="/hero/:id" element={<HeroDetail />} />
                <Route
                    path="/dashboard"
                    element={<WithAuth component={Test} />}
                />
                <Route
                    path="/register"
                    element={
                        <StartPage
                            p="Dont have account? Resigter now"
                            component={<SignUpForm />}
                        />
                    }
                />
                <Route path="/" element={<Market />} />
            </Routes>
        </Router>
    )
}

export default App
