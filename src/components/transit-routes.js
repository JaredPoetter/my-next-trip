import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { requestRoutes } from '../api/api';
import DropDown from './dropdown';

export default function TransitRoutes() {
    // Local state
    const [routes, setRoutes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState(null);

    // Helper variables
    const navigate = useNavigate();

    // Loading data when the component is mounted
    useEffect(() => {
        (async () => {
            try {
                const fetchedRoutes = await requestRoutes();
                setRoutes(fetchedRoutes);
            } catch (e) {
                setErrorMessage(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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
            <h2>Transit Routes</h2>
            {routes.length > 0 ? (
                <DropDown
                    defaultOption={'Select Route'}
                    optionArray={routes}
                    labelKey="route_label"
                    idKey="route_id"
                    onSelect={(routeId) => navigate(`route/${routeId}`)}
                />
            ) : (
                <h3>No routes found.</h3>
            )}
        </div>
    );
}
