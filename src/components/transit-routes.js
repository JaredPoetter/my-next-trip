import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'reactstrap';
import { requestRoutes } from '../api';

export default function TransitRoutes() {
    const [routes, setRoutes] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');

    // Getting the bus routes
    useEffect(() => {
        (async () => {
            try {
                const fetchedRoutes = await requestRoutes();
                setRoutes(fetchedRoutes);
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
            <h2>Transit Routes</h2>
            <List>
                {routes.length > 0 ? (
                    routes.map((route, index) => {
                        return (
                            <li key={`${route.route_id}-${index}`}>
                                <Link
                                    className="transit-route-link"
                                    to={`route/${route.route_id}`}
                                >
                                    {route.route_label}
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <li>No transit routes found.</li>
                )}
            </List>
        </div>
    );
}
