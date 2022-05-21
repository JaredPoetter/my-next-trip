import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    requestDirectionDetails,
    requestDirections,
    requestRouteDetails,
    requestRoutes,
    requestStopInformation,
} from '../api';
import DepatureList from './departure-list';

export default function Information() {
    const [transitRoute, setTransitRoute] = React.useState({ route_label: '' });
    const [direction, setDirection] = React.useState({ direction_name: '' });
    const [stopInformation, setStopInformation] = React.useState({ stops: [] });
    const [badRequest, setBadRequest] = React.useState(false);
    const [badRequestMessage, setBadRequestMessage] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
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
                setBadRequest(true);
                setBadRequestMessage(e.message);
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
        return <h2>Bad Request: {badRequestMessage}</h2>;
    }

    const stopName =
        stopInformation &&
        stopInformation.stops &&
        stopInformation.stops.length > 0
            ? stopInformation.stops[0].description
            : '';

    return (
        <div>
            <h3>Route: {transitRoute.route_label}</h3>
            <h3>Direction: {direction.direction_name}</h3>
            <h3>Stop: {stopName}</h3>
            <h2>Information</h2>
            {stopInformation &&
            stopInformation.departures &&
            stopInformation.departures.length > 0 ? (
                <DepatureList departureData={stopInformation} />
            ) : (
                <h3>No departures at this time.</h3>
            )}
        </div>
    );
}
