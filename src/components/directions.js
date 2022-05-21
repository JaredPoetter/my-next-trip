import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List } from 'reactstrap';
import {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
    requestRouteDetails,
} from './../api';

export default function Directions() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [directions, setDirections] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRouteDetails = await requestRouteDetails(
                    params.routeId
                );
                setTransitRoute(fetchedRouteDetails);

                const fetchedDirections = await requestDirections(
                    params.routeId
                );
                setDirections(fetchedDirections);
            } catch (e) {
                setBadRequest(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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
            <h2>Directions</h2>
            <List>
                {directions.length > 0 ? (
                    directions.map((direction, index) => {
                        return (
                            <li key={`${direction.direction_id}-${index}`}>
                                <Link
                                    to={`direction/${direction.direction_id}`}
                                >
                                    {direction.direction_name}
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <li>No directions found for specified route.</li>
                )}
            </List>
        </div>
    );
}
