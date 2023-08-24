import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthContextProvider } from "./context/Authcontext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "https://facebookserver-hvmq.onrender.com/api/";
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
