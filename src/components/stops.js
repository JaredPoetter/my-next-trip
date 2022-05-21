import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List } from 'reactstrap';
import {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
} from './../api';

export default function Stops() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [direction, setDirection] = React.useState({});
    const [stops, setStops] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const params = useParams();

    useEffect(() => {
        // Getting the bus route information
        requestRoutes()
            .then((routes) => {
                const selectedRoute = routes.filter((route) => {
                    return params.routeId === route.route_id;
                });

                // Checking to make sure we found a hit
                if (selectedRoute.length <= 0) {
                    setBadRequest(true);
                } else {
                    setTransitRoute(selectedRoute[0]);
                }
            })
            .catch((e) => {
                setBadRequest(true);
                console.error(e);
            });

        // Getting the direction name
        requestDirections(params.routeId)
            .then((directions) => {
                const directionIdNumber = parseInt(params.directionId, 10);

                const selectedDirection = directions.filter((direction) => {
                    return directionIdNumber === direction.direction_id;
                });

                // Checking to make sure we found a hit
                if (selectedDirection.length <= 0) {
                    setBadRequest(true);
                } else {
                    setDirection(selectedDirection[0]);
                }
            })
            .catch((e) => {
                setBadRequest(true);
                console.error(e);
            });

        // Getting the stops for the selected route and direction
        requestStops(params.routeId, params.directionId)
            .then((stops) => {
                // Storing the stops
                setStops(stops);
            })
            .catch((e) => {
                setBadRequest(true);
                console.error(e);
            });
    }, []);

    return (
        <div>
            {badRequest ? (
                <h2>Bad Request</h2>
            ) : (
                <div>
                    <h3>Route: {transitRoute.route_label}</h3>
                    <h3>Direction: {direction.direction_name}</h3>
                    <h2>Stops</h2>
                    <List>
                        {stops.length > 0 ? (
                            stops.map((stop, index) => {
                                return (
                                    <li key={`${stop.place_code}-${index}`}>
                                        <Link to={`stop/${stop.place_code}`}>
                                            {stop.description}
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li>
                                No stops found for specified route and
                                direction.
                            </li>
                        )}
                    </List>
                </div>
            )}
        </div>
    );
}
