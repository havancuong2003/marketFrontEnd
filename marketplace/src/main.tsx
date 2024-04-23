import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { configAxios } from "./services";

import "./index.css";

configAxios();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
