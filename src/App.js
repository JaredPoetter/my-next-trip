import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TransitRoutes from './components/transit-routes';
import Directions from './components/directions';
import Stops from './components/stops';
import Information from './components/information';
import NotFound from './components/not-found';

export default function App() {
    return (
        <div>
            <h1>My NextTrip App</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TransitRoutes />}></Route>
                    <Route
                        path="/route/:routeId"
                        element={<Directions />}
                    ></Route>
                    <Route
                        path="/route/:routeId/direction/:directionId"
                        element={<Stops />}
                    ></Route>
                    <Route
                        path="/route/:routeId/direction/:directionId/stop/:stopId"
                        element={<Information />}
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
