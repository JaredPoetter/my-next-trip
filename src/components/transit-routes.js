import React from "react";
import { Link } from "react-router-dom";

export default class TransitRoutes extends React.Component {
    render() {
        return (
            <div>
                <h2>Transit Routes</h2>
                {this.props.routes.map((route, index) => {
                    return (<div key={`${route.route_id}-${index}`}><Link to={`route/${route.route_id}`}>{route.route_label}</Link><br/></div>)
                })}
            </div>
        )
    }
}