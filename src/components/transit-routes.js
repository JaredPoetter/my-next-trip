import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { requestRoutes } from "../api";

export default function TransitRoutes() {
    const [routes, setRoutes] = React.useState([])

    useEffect(() => {
        // Getting the bus routes
        requestRoutes().then((routes) => {
            setRoutes(routes)
        });
    }, []);

    return (
        <div>
            <h2>Transit Routes</h2>
            {routes.length > 0 ?
                routes.map((route, index) => {
                    return (<div key={`${route.route_id}-${index}`}><Link to={`route/${route.route_id}`}>{route.route_label}</Link><br/></div>)
                })
                : <h3>No transit routes found.</h3>
            }
        </div>
    )
}