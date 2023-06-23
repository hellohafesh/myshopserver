import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Authprovider } from "./Context/AuthContext";
import "antd/dist/reset.css";
import { SearchProvider } from "./Context/SearchContex";
import { CartProvider } from "./Context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Authprovider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </Authprovider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
