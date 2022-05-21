import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TransitRoutes from './components/transit-routes';
import Directions from './components/directions';
import Stops from './components/stops';
import Information from './components/information';
import BadRequest from './components/bad-request';

export default function App() {
    return (
        <div>
            <h1>My NextTrip App</h1>
            <Routes>
                <Route path="/" element={<TransitRoutes />} />
                <Route path="/route/:routeId" element={<Directions />} />
                <Route
                    path="/route/:routeId/direction/:directionId"
                    element={<Stops />}
                />
                <Route
                    path="/route/:routeId/direction/:directionId/stop/:stopId"
                    element={<Information />}
                />
                <Route path="*" element={<BadRequest />}></Route>
            </Routes>
        </div>
    );
}
