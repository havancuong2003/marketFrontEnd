import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { LoginForm, SignUpForm } from "./components";

const LazyMarket = React.lazy(() =>
    import("./pages").then(({ Market }) => ({ default: Market }))
);
const LazyAuth = React.lazy(() =>
    import("./pages").then(({ Start }) => ({ default: Start }))
);
const LazyStartPage = React.lazy(() =>
    import("./pages").then(({ StartPage }) => ({ default: StartPage }))
);
const LazyInventory = React.lazy(() =>
    import("./pages").then(({ InventoryHero }) => ({
        default: InventoryHero,
    }))
);
const LazyActivities = React.lazy(() =>
    import("./pages").then(({ Activities }) => ({
        default: Activities,
    }))
);
const LazyBuyHero = React.lazy(() =>
    import("./components/trasnaction").then(({ BuyHero }) => ({
        default: BuyHero,
    }))
);
const LazyProfile = React.lazy(() =>
    import("./pages/profile").then(({ Profile }) => ({ default: Profile }))
);
const LazyHeroDetail = React.lazy(() =>
    import("./pages").then(({ HeroDetail }) => ({
        default: HeroDetail,
    }))
);
const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route index element={<LazyMarket />} />

                    <Route
                        path="/login"
                        element={
                            <LazyStartPage
                                p="Login to start your journey"
                                component={<LoginForm />}
                            />
                        }
                    />
                    <Route path="/auth" element={<LazyAuth />} />
                    <Route
                        path="/register"
                        element={
                            <LazyStartPage
                                p="Dont have account? Resigter now"
                                component={<SignUpForm />}
                            />
                        }
                    />
                    <Route path="/inventory" element={<LazyInventory />} />
                    <Route path="/activities" element={<LazyActivities />} />
                    <Route
                        path="hero/:id/detail"
                        element={<LazyHeroDetail />}
                    />
                    <Route path="/confirm" element={<LazyBuyHero />} />
                    <Route path="/profile" element={<LazyProfile />} />
                </Routes>
            </Suspense>
        </Router>

        //     <Suspense fallback={<div>Loading...</div>}>
        //             <LazyMarket/>
        //   </Suspense>
    );
};

export default App;
