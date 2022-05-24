import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { requestDirections, requestRouteDetails } from '../api/api';
import DropDown from './dropdown';
import RouteSelection from './route-selection';

export default function Directions() {
    // Local state
    const [transitRoute, setTransitRoute] = React.useState({});
    const [directions, setDirections] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // Helper variables
    const navigate = useNavigate();
    const params = useParams();

    // Loading data when the component is mounted
    useEffect(() => {
        (async () => {
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
                setErrorMessage(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [params.routeId]);

    // Checking if we are still loading
    if (loading) {
        return <Spinner>Loading...</Spinner>;
    }

    // Checking if we had a bad request
    if (errorMessage) {
        return <h2>Bad Request: {errorMessage}</h2>;
    }

    return (
        <div>
            <RouteSelection route={transitRoute.route_label} />
            <h2>Directions</h2>
            {directions.length > 0 ? (
                <DropDown
                    defaultOption="Select Direction"
                    optionArray={directions}
                    labelKey="direction_name"
                    idKey="direction_id"
                    onSelect={(directionId) =>
                        navigate(`direction/${directionId}`)
                    }
                />
            ) : (
                <h3>No directions found for specified route.</h3>
            )}
        </div>
    );
}
