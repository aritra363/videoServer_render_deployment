/* 
  Title : Index File
  Description : Main entry point of the client side 
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
