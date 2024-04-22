<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { isAuthenticated } from "../../utils/is-authenticated";
export const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token từ localStorage (điều này giả sử bạn lưu token trong localStorage)

    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <div className="w-screen h-[64px] bg-[#3C2C19] flex text-white justify-between">
      <div className="flex justify-center items-center">
        <img className="mx-20" src={logo} alt="logo" />
        <div
          className="mx-20 cursor-pointer rounded-lg p-1 hover:bg-violet-600  "
          onClick={() => navigate("/")}
        >
          Market Place
        </div>
        <div
          className="cursor-pointer rounded-lg p-1 hover:bg-violet-600"
          onClick={() => navigate("/inventory/hero")}
        >
          Inventory
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div
          className="border mr-20 rounded-full p-3 hover:bg-violet-600 "
          onClick={() => navigate(isAuthenticated() ? "/profile" : "/login")}
        >
          <div className="cursor-pointer ">
            {isAuthenticated() ? "Profile" : "Login"}
          </div>
        </div>
        <div
          className="border mr-20 rounded-full p-3 cursor-pointer hover:bg-violet-600 "
          onClick={() =>
            isAuthenticated() ? handleLogout() : navigate("/register")
          }
        >
          <div>{isAuthenticated() ? "Logout" : "Register"}</div>
        </div>
      </div>
    </div>
  );
};
=======
import { useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import { isAuthenticated } from "../../utils/is-authenticated"
export const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("token") // Xóa token từ localStorage (điều này giả sử bạn lưu token trong localStorage)

        navigate("/login")
    }
    const navigate = useNavigate()
    return (
        <div className="w-full h-[64px] bg-[#3C2C19] flex text-white justify-between">
            <div className="flex jucestify-center items-center">
                <img className="mx-20" src={logo} alt="logo" />
                <div
                    className="mx-20 cursor-pointer rounded-lg p-1 hover:bg-violet-600  "
                    onClick={() => navigate("/")}
                >
                    Market Place
                </div>
                <div
                    className="cursor-pointer rounded-lg p-1 hover:bg-violet-600"
                    onClick={() => navigate("/inventory")}
                >
                    Inventory
                </div>
            </div>
            <div className="flex justify-center items-center ">
                <div
                    className="border mr-20 rounded-full p-3 hover:bg-violet-600 "
                    onClick={() =>
                        navigate(isAuthenticated() ? "/profile" : "/login")
                    }
                >
                    <div className="cursor-pointer ">
                        {isAuthenticated() ? "Profile" : "Login"}
                    </div>
                </div>
                <div
                    className="border mr-20 rounded-full p-3 cursor-pointer hover:bg-violet-600 "
                    onClick={() =>
                        isAuthenticated()
                            ? handleLogout()
                            : navigate("/register")
                    }
                >
                    <div>{isAuthenticated() ? "Logout" : "Register"}</div>
                </div>
            </div>
        </div>
    )
}
>>>>>>> parent of c09efe0 (add:add responsive)
