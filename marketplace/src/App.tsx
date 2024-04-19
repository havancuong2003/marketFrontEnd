import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import { StartPage } from "./pages/Start-page";
import { WithAuth } from "./utils/with-auth";
import { Start } from "./pages/Start";
import { SignUpForm } from "./components/Sign-up-form";
import { LoginForm } from "./components";
import { Market } from "./pages/Market";
import { HeroDetail } from "./pages";

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
        <Route path="/dashboard" element={<WithAuth component={Test} />} />
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
        <Route path="hero/:id/detail" element={<HeroDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
