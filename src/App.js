import logo from "./logo.svg";
import "./App.css";

// import 'api.js';
import { requestRoutes, requestDirections, requestStops, requestStopInformation } from "./api";
import DropDown from "./components/dropdown";
import Input from "./components/input";
import React, { useEffect, useState } from "react";
import DropDownClass from "./components/dropdown-class";
import DepatureList from "./components/departure-list";

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
                <DropDownClass
                    title='Select bus route:'
                    defaultOption='Routes'
                    optionArray={this.state.routes}
                    labelKey='route_label'
                    idKey='route_id'
                    onSelect={this.onSelectRoute}
                />
                {this.state.directions.length > 0 ?
                    <DropDownClass
                        title='Select direction:'
                        defaultOption='Direction'
                        optionArray={this.state.directions}
                        labelKey='direction_name'
                        idKey='direction_id'
                        onSelect={this.onSelectDirection}
                    />
                    : ''
                }
                {this.state.stops.length > 0 ?
                    <DropDownClass
                        title='Select stop:'
                        defaultOption='Stops'
                        optionArray={this.state.stops}
                        labelKey='description'
                        idKey='place_code'
                        onSelect={this.onSelectStop}
                    />
                    : ''
                }
                {this.state.stopInformation && this.state.stopInformation.departures && this.state.stopInformation.departures.length > 0 ? 
                    <DepatureList
                        departureData={this.state.stopInformation}
                    />
                    : <h3>No departures at this time.</h3>
                }
            </div>
        )
    }
}
