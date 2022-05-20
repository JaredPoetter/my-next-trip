import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
} from './../api';

export default function Directions() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [directions, setDirections] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const params = useParams();

    useEffect(() => {
        // Getting the bus route information for better usability
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

        //
        requestDirections(params.routeId)
            .then((directions) => {
                // debugger
                console.log('directions', directions);
                // Storing the directions
                setDirections(directions);
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
                    <h2>Directions</h2>
                    {directions.length > 0 ? (
                        directions.map((direction, index) => {
                            return (
                                <div key={`${direction.direction_id}-${index}`}>
                                    <Link
                                        to={`direction/${direction.direction_id}`}
                                    >
                                        {direction.direction_name}
                                    </Link>
                                    <br />
                                </div>
                            );
                        })
                    ) : (
                        <h3>No directions found for specified route.</h3>
                    )}
                </div>
            )}
        </div>
    );
}
