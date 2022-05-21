import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List } from 'reactstrap';
import {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
    requestRouteDetails,
    requestDirectionDetails,
} from './../api';

export default function Stops() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [direction, setDirection] = React.useState({});
    const [stops, setStops] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const params = useParams();

    useEffect(() => {
        (async () => {
            try {
                const fetchedRouteDetails = await requestRouteDetails(
                    params.routeId
                );
                setTransitRoute(fetchedRouteDetails);

                const fetchedDirectionDetails = await requestDirectionDetails(
                    params.routeId,
                    params.directionId
                );
                setDirection(fetchedDirectionDetails);

                const fetchedStops = await requestStops(
                    params.routeId,
                    params.directionId
                );
                setStops(fetchedStops);
            } catch (e) {
                setBadRequest(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Checking if we are still loading
    if (loading) {
        return <h2>Loading</h2>;
    }

    // Checking if we had a bad request
    if (badRequest) {
        return <h2>Bad Request</h2>;
    }

    return (
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
                    <li>No stops found for specified route and direction.</li>
                )}
            </List>
        </div>
    );
}
