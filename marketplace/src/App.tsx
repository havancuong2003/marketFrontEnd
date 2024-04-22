import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Test from "./components/Test"
import { StartPage } from "./pages/start-page"
import { WithAuth } from "./utils/with-auth"
import { Start } from "./pages/start"
import { SignUpForm } from "./components/sign-up-form"
import { LoginForm } from "./components/login-form"
import { Market } from "./pages/market/market"
import { HeroDetail } from "./pages/hero-infomation/hero-info"
import { BuyHero } from "./components/trasnaction"
import { InventoryHero } from "./pages/inventory/hero-inventory"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Market />} />

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
                <Route
                    path="/register"
                    element={
                        <StartPage
                            p="Dont have account? Resigter now"
                            component={<SignUpForm />}
                        />
                    }
                />
                <Route path="/inventory/hero" element={<InventoryHero />} />
                <Route
                    path="/dashboard"
                    element={<WithAuth component={Test} />}
                />
                <Route path="hero/:id/detail" element={<HeroDetail />} />
                <Route path="/confirm" element={<BuyHero />} />
            </Routes>
        </Router>
    )
}

export default App
