import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

import './departure-list.css';

export default function DepartureList(props) {
    return (
        <Table className="departure-list-table" bordered striped>
            <thead>
                <tr>
                    <th>Route</th>
                    <th>Destination</th>
                    <th>Departs</th>
                </tr>
            </thead>
            <tbody>
                {props.departureData.departures.map((departure, index) => {
                    return (
                        <tr key={`${departure.route_short_name}-${index}`}>
                            <td>{departure.route_short_name}</td>
                            <td>{departure.description}</td>
                            <td>{departure.departure_text}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

DepartureList.propTypes = {
    departureData: PropTypes.object,
};
