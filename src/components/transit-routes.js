import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestRoutes } from '../api';

export default function TransitRoutes() {
    const [routes, setRoutes] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);

    useEffect(() => {
        // Getting the bus routes
        requestRoutes()
            .then((routes) => {
                setRoutes(routes);
            })
            .catch((e) => {
                setBadRequest(true);
                console.log(e);
            });
    }, []);

    return (
        <div>
            {badRequest ? (
                <h2>Bad Request</h2>
            ) : (
                <div>
                    <h2>Transit Routes</h2>
                    {routes.length > 0 ? (
                        routes.map((route, index) => {
                            return (
                                <div key={`${route.route_id}-${index}`}>
                                    <Link
                                        className="transit-route-link"
                                        to={`route/${route.route_id}`}
                                    >
                                        {route.route_label}
                                    </Link>
                                    <br />
                                </div>
                            );
                        })
                    ) : (
                        <h3>No transit routes found.</h3>
                    )}
                </div>
            )}
        </div>
    );
}
