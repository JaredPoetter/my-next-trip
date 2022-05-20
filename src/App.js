import logo from './logo.svg';
import './App.css';

// import 'api.js';
import {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
} from './api';
import DropDown from './components/dropdown';
import Input from './components/input';
import React, { useEffect, useState } from 'react';
import DropDownClass from './components/dropdown-class';
import DepatureList from './components/departure-list';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TransitRoutes from './components/transit-routes';
import Directions from './components/directions';
import Stops from './components/stops';
import Information from './components/information';
import NotFound from './components/not-found';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            routes: [],
            directions: [],
            stops: [],
            stopInformation: {},
            selectedRoute: '',
            selectedDirection: '',
            selectedStop: '',
        };
    }

    render() {
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
}
