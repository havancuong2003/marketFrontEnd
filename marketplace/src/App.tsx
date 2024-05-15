import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { Layout, LoginForm, SignUpForm } from "./components";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { isAuthenticated } from "./utils";
import { io, Socket } from "socket.io-client";
import { HeroDetail } from "./pages";



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

const PrivateRoute = ({ children }) => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};



const App: React.FC = () => {
    const [socket,setSocket] = useState<Socket>()
    const [event,setEvent] = useState("")

    const send = (value:string) =>{

        socket?.emit("messages",value)
        console.log("socket",value)
    }
    useEffect(() => {
        const newSocket = io("http://localhost:8001");
        setSocket(newSocket)
    },[setSocket])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const eventListener = (event:string) => {
        setEvent(event)
    }
    useEffect(() => {
        socket?.on("messages",eventListener);
        return () => {socket?.off("messages",eventListener)}
    },[eventListener])
    return (
        <Router>
            <Suspense
                fallback={
                    <div className="w-full h-screen flex justify-center items-center">
                        <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                        </Box>
                    </div>
                }
            >
                <Routes>
                    {/* PUBLIC ROUTE */}
                    <Route index element={
                    <Layout>
                        <LazyMarket send={send}/>
                    </Layout>
                        
                    
                    } />

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

                    <Route
                        path="hero/:id/detail"
                        element={
                            <Layout>
                                <LazyHeroDetail send={send} />
                            </Layout>
                        }
                    />
                    {/* PRIVATE ROUTE */}
                    <Route
                        path="/inventory"
                        element={
                            <Layout>
                                <PrivateRoute>
                                    <LazyInventory />
                                </PrivateRoute>
                            </Layout>
                        }
                    />
                    <Route
                        path="/activities"
                        element={
                            <Layout>
                                <PrivateRoute>
                                    <LazyActivities />
                                </PrivateRoute>
                            </Layout>
                        }
                    />
                    <Route
                        path="/confirm"
                        element={
                            <Layout>
                                <PrivateRoute>
                                    <LazyBuyHero />
                                </PrivateRoute>
                            </Layout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Layout>
                                <PrivateRoute>
                                    <LazyProfile />
                                </PrivateRoute>
                            </Layout>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>

        //     <Suspense fallback={<div>Loading...</div>}>
        //             <LazyMarket/>
        //   </Suspense>
    );
};

export default App;
