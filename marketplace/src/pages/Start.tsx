<<<<<<< HEAD
<<<<<<< HEAD:marketplace/src/pages/start/start.tsx
import { ButtonStart } from "../../components";
import button from "../../assets/img/button.png";
export const Start = () => {
  return (
    <div className="flex justify-center items-center bg-bglogin h-screen relative">
      <div className="text-white absolute top-32 left-28">
        <img src={button} alt="button" className="relative" />
        <span
          className="cursor-pointer absolute top-3 left-8 text-2xl"
          onClick={() => (window.location.href = "/")}
        >
          Market
        </span>
      </div>
      <div className="text-while lg:flex lg:justify-center lg:items-center">
        <ButtonStart
          data="Login"
          to="/login"
          className="absolute left-44 top-2 text-3xl"
        />
        <ButtonStart
          data="Create Account"
          to="/register"
          className="absolute left-32 top-2 text-3xl"
        />
      </div>
    </div>
  );
};
=======
import { ButtonStart } from "../components/common/button-start"
=======
import { ButtonStart } from "../components/common/Button-start"
>>>>>>> parent of c09efe0 (add:add responsive)
import button from "../assets/img/button.png"
export const Start = () => {
    return (
        <div className="flex justify-center items-center bg-bglogin h-screen relative">
            <div className="text-white absolute top-32 left-28">
                <img src={button} alt="button" className="relative" />
                <span
                    className="cursor-pointer absolute top-3 left-8 text-2xl"
                    onClick={() => (window.location.href = "/")}
                >
                    Market
                </span>
            </div>
            <div className="text-while flex justify-center items-center">
                <ButtonStart
                    data="Login"
                    to="/login"
                    className="absolute left-44 top-2 text-3xl"
                />
                <ButtonStart
                    data="Create Account"
                    to="/register"
                    className="absolute left-32 top-2 text-3xl"
                />
            </div>
        </div>
    )
}
>>>>>>> parent of 223ec22 (feat/cuong: update responsive login sign up):marketplace/src/pages/Start.tsx
