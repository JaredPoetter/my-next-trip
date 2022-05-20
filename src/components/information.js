import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    requestDirections,
    requestRoutes,
    requestStopInformation,
} from '../api';
import DepatureList from './departure-list';

export default function Information() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [direction, setDirection] = React.useState({});
    const [information, setInformation] = React.useState({ stops: [] });
    const params = useParams();

    useEffect(() => {
        // Getting the bus route information for better usability
        requestRoutes().then((routes) => {
            const selectedRoute = routes.filter((route) => {
                return params.routeId === route.route_id;
            });
            setTransitRoute(selectedRoute[0]);
        });

        //
        requestDirections(params.routeId).then((directions) => {
            const directionIdNumber = parseInt(params.directionId, 10);

            const selectedDirection = directions.filter((direction) => {
                return directionIdNumber === direction.direction_id;
            });
            setDirection(selectedDirection[0]);
        });

        // Getting the stops for the selected route and direction
        requestStopInformation(
            params.routeId,
            params.directionId,
            params.stopId
        )
            .then((information) => {
                console.log('information', information);
                // Storing the information
                setInformation(information);
            })
            .catch(() => {
                console.log('catching the error from rest call'); // TODO
            });
    }, []);

    return (
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
                    No information found for specified route, direction and
                    stop.
                </h3>
            )}
        </div>
    );
}
