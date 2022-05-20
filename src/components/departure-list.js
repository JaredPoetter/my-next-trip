import React from "react";
import './departure-list.css';

export default class DepatureList extends React.Component {
    render() {
        // TODO: Expand the this.props to be variable names instead of 'this.props.' when using these values

        return (
            <table>
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Destination</th>
                        <th>Departs</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.departureData.departures.map((departure, index) => {
                        const routeNameKey = `${departure.route_short_name}-${index}`
                        const destinationKey = `${departure.description}-${index}`
                        const departureKey = `${departure.departure_text}-${index}`
                        return (<tr key={`${departure.route_short_name}-${departure.description}-${departure.departure_text}`}>
                            <td key={routeNameKey}>{departure.route_short_name}</td>
                            <td key={destinationKey}>{departure.description}</td>
                            <td key={departureKey}>{departure.departure_text}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}