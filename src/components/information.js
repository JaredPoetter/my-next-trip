import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    requestDirections,
    requestRoutes,
    requestStopInformation,
} from '../api';
import DepatureList from './departure-list';

export default function Information() {
    const [transitRoute, setTransitRoute] = React.useState({ route_label: '' });
    const [direction, setDirection] = React.useState({ direction_name: '' });
    const [information, setInformation] = React.useState({ stops: [] });
    const [badRequest, setBadRequest] = React.useState(false);
    const params = useParams();

    useEffect(() => {
        // Getting the bus route information for better usability
        requestRoutes()
            .then((routes) => {
                // debugger;
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

        //
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
        requestStopInformation(
            params.routeId,
            params.directionId,
            params.stopId
        )
            .then((information) => {
                // Storing the information
                setInformation(information);
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
                    {information &&
                    information.stops &&
                    information.stops.length > 0 ? (
                        <h3>Stop: {information.stops[0].description}</h3>
                    ) : (
                        ''
                    )}
                    <h2>Information</h2>
                    {information &&
                    information.departures &&
                    information.departures.length > 0 ? (
                        <DepatureList departureData={information} />
                    ) : (
                        ''
                    )}
                    {information &&
                    information.departures &&
                    information.departures.length === 0 ? (
                        <h3>No departures at this time.</h3>
                    ) : (
                        ''
                    )}
                    {information && information.departures ? (
                        ''
                    ) : (
                        <h3>
                            No information found for specified route, direction
                            and stop.
                        </h3>
                    )}
                </div>
            )}
        </div>
    );
}
