import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
        {/* <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='route/:routeId' element={<App />}>
                        <Route path='direction/:directionId' element={<App />}>
                            <Route path='stop/:stopId' element={<App />}>
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter> */}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
