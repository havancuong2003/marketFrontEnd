import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        username,
      });

      navigate("/login");
      console.log(response + "abc");
      console.log(email);
      console.log(password);
      console.log(username);
    } catch (error) {
      console.error("Register failed: ", error);
      setError(error.response.data.message);
    }
  };
  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    error,
    handleUsernameChange,
    username,
  };
};
