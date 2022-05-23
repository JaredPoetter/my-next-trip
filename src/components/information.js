import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import {
    requestDirectionDetails,
    requestRouteDetails,
    requestStopInformation,
} from '../api/api';
import DepartureList from './departure-list';
import RouteSelection from './route-selection';

export default function Information() {
    // Local state
    const [transitRoute, setTransitRoute] = React.useState({ route_label: '' });
    const [direction, setDirection] = React.useState({ direction_name: '' });
    const [stopInformation, setStopInformation] = React.useState({ stops: [] });
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // Helper variables
    const params = useParams();

    // Loading data when the component is mounted
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

                const fetchedStopInformation = await requestStopInformation(
                    params.routeId,
                    params.directionId,
                    params.stopId
                );
                setStopInformation(fetchedStopInformation);
            } catch (e) {
                setErrorMessage(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [params.routeId, params.directionId, params.stopId]);

    // Checking if we are still loading
    if (loading) {
        return <Spinner>Loading...</Spinner>;
    }

    // Checking if we had a bad request
    if (errorMessage) {
        return <h2>Bad Request: {errorMessage}</h2>;
    }

    // Computing the stop name
    const stopName =
        stopInformation &&
        stopInformation.stops &&
        stopInformation.stops.length > 0
            ? stopInformation.stops[0].description
            : '';

    return (
        <div>
            <RouteSelection
                route={transitRoute.route_label}
                direction={direction.direction_name}
                stop={stopName}
            />
            <h2 className="">Information</h2>
            {stopInformation &&
            stopInformation.departures &&
            stopInformation.departures.length > 0 ? (
                <DepartureList departureData={stopInformation} />
            ) : (
                <h3>No departures at this time.</h3>
            )}
        </div>
    );
}
