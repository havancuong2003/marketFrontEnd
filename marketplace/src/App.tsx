import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { StartPage } from "./pages/start-page";
import { Start } from "./pages/start";
import { SignUpForm } from "./components/sign-up-form";
import { LoginForm } from "./components/login-form";
import { Market } from "./pages/market/market";
import { HeroDetail } from "./pages/hero-infomation";
import { BuyHero } from "./components/trasnaction";
import { InventoryHero } from "./pages/inventory";
import { Activities } from "./pages/activity/activity";
import { Profile } from "./pages/profile";
import { isAuthenticated } from "./utils";

const App = () => {
    const isAuth = isAuthenticated();

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
                <Route path="hero/:id/detail" element={<HeroDetail />} />

                <Route path="/inventory" element={<InventoryHero />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/confirm" element={<BuyHero />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;
