import React from 'react';
import './route-selection.css';

export default function RouteSelection(props) {
    return (
        <div className="route-selection">
            {props.route ? <h3>Route: {props.route}</h3> : ''}
            {props.direction ? <h3>Direction: {props.direction}</h3> : ''}
            {props.stop ? <h3>Stop: {props.stop}</h3> : ''}
        </div>
    );
}
