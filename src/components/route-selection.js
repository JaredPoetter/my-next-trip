import React from 'react';
import './route-selection.css';

export default function RouteSelection(props) {
    return (
        <div className="route-selection">
            <h4>Route Selection</h4>
            {props.route ? (
                <h5 className="route-selection-item">Route: {props.route}</h5>
            ) : (
                ''
            )}
            {props.direction ? (
                <h5 className="route-selection-item">
                    Direction: {props.direction}
                </h5>
            ) : (
                ''
            )}
            {props.stop ? (
                <h5 className="route-selection-item">Stop: {props.stop}</h5>
            ) : (
                ''
            )}
        </div>
    );
}
