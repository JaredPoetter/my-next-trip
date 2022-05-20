import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { requestRoutes, requestDirections, requestStops, requestStopInformation } from "./../api";

export default function Stops() {
    const [transitRoute, setTransitRoute] = React.useState({})
    const [direction, setDirection] = React.useState({})
    const [stops, setStops] = React.useState([])
    const params = useParams();
    
    useEffect(() => {
        // Getting the bus route information for better usability
        requestRoutes().then((routes) => {
            const selectedRoute = routes.filter((route) => {
                return params.routeId === route.route_id;
            })
            setTransitRoute(selectedRoute[0]);
        });

        // 
        requestDirections(params.routeId).then((directions) => {
            // debugger
            const directionIdNumber = parseInt(params.directionId, 10);

            const selectedDirection = directions.filter((direction) => {
                return directionIdNumber === direction.direction_id;
            })
            setDirection(selectedDirection[0])
        });

        // Getting the stops for the selected route and direction
        requestStops(params.routeId, params.directionId).then((stops) => {
            // debugger
            console.log('stops', stops)
            // Storing the stops
            setStops(stops)
        })
    }, [])
    
    return (
        <div>
            <h3>Route: {transitRoute.route_label}</h3>
            <h3>Direction: {direction.direction_name}</h3>
            <h2>Stops</h2>
            {stops.length > 0 ?
                stops.map((stop, index) => {
                    return (<div key={`${stop.place_code}-${index}`}><Link to={`stop/${stop.place_code}`}>{stop.description}</Link><br/></div>)
                })
                :
                <h3>No stops found for specified route and direction.</h3>
            }
        </div>
    )
}