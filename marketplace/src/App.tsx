import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import StartPage from "./pages/Start-page";
import WithAuth from "./utils/with-auth";
import Start from "./pages/Start";
import SignUpForm from "./components/Sign-up-form";
import LoginForm from "./components/Login-form";
import Market from "./pages/Market";
import { Activity } from "./pages";



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
        <Route element={<Priv}>
        </Route>
        <Route
          path="/inventory/activity"
          element={<Activity/>}
        />
        <Route path="/" element={<Market />} />
      </Routes>
    </Router>
  );
};

export default App;
