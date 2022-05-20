import logo from "./logo.svg";
import "./App.css";

// import 'api.js';
import { requestRoutes, requestDirections, requestStops, requestStopInformation } from "./api";
import DropDown from "./components/dropdown";
import Input from "./components/input";
import React, { useEffect, useState } from "react";
import DropDownClass from "./components/dropdown-class";
import DepatureList from "./components/departure-list";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TransitRoutes from "./components/transit-routes";
import Directions from "./components/directions";
import Stops from "./components/stops";
import Information from "./components/information";
import NotFound from "./components/not-found";

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
        }
    }

    componentDidMount = () => {
        // Getting the bus routes
        requestRoutes().then((routes) => { this.setState({ routes: routes }) });
    }

    onSelectRoute = (routeId) => {
        // window.location = routeId

        // window.history.push(`${window.location.search}&route=${routeId}`)

        // window.location.href += routeId;

        // Checking if there was a route, direction or stop already selected
        if (this.state.selectedRoute !== '') {
            // Clearing out the set of stops, selected direction, selected stop
            this.setState({
                stops: [],
                selectedDirection: '',
                selectedStop: '',
                stopInformation: {},
            })
        }

        console.log('routeId, ', routeId)

        // Storing the route id
        this.setState({ selectedRoute: routeId })

        // Getting the directions for the selected route
        requestDirections(routeId).then((directions) => { 
            console.log('directions', directions)

            // Storing the directions
            this.setState({ directions: directions })
        });
    }

    onSelectDirection = async (directionId) => {
        // window.location = directionId

        // window.location.href += 

        // Storing the direction id
        this.setState({ selectedDirection: directionId })

        // Checking if there was a route, direction or stop already selected
        if (this.state.selectedRoute !== '') {
            // Clearing out the set of stops, selected direction, selected stop
            this.setState({
                stops: [],
                selectedStop: '',
                stopInformation: {},
            })
        }
        

        // Getting the stops for the selected route and direction
        requestStops(this.state.selectedRoute, directionId)
        .then((stops) => {
            // Storing the stops
            this.setState({ stops: stops })
        })
    }

    onSelectStop = (stopId) => {
        console.log('stopId', stopId)

        // Storing the stop id
        this.setState({ selectedStop: stopId })

        // Getting the information for the selected route, direction and stop
        requestStopInformation(this.state.selectedRoute, this.state.selectedDirection, stopId)
        .then((information) => {
            console.log('information', information)
            this.setState({ stopInformation: information })
        })
    }

    render() {
        return (
            <div>
                <h1>My NextTrip App</h1>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<TransitRoutes routes={this.state.routes} />}>
                        </Route>
                        <Route path='/route/:routeId' element={<Directions />}>
                        </Route>
                        <Route path='/route/:routeId/direction/:directionId' element={<Stops />}>
                        </Route>
                        <Route path='/route/:routeId/direction/:directionId/stop/:stopId' element={<Information />}>
                        </Route>
                        <Route path='*' element={<NotFound />}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
