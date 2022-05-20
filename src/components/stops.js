import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { requestRoutes, requestDirections, requestStops, requestStopInformation } from "./../api";

export default function Stops() {
    const [stops, setStops] = React.useState([])
    const params = useParams();
    
    // requestDirections(params.routeId).then((directions) => {
    //     console.log('directions', directions)
    //     // Storing the directions
    //     setDirections(directions)
    // });

    useEffect(() => {
        // Getting the stops for the selected route and direction
        requestStops(params.routeId, params.directionId)
        .then((stops) => {
            // debugger
            console.log('stops', stops)
            // Storing the stops
            setStops(stops)
        })    
    }, [])
    
    return (
        <div>
            <h2>Stops</h2>
            {stops.length > 0 ?
                stops.map((stop, index) => {
                    return (<div key={`${stop.place_code}-${index}`}><Link to={`/route/${params.routeId}/direction/${params.directionId}/stop/${stop.place_code}`}>{stop.description}</Link><br/></div>)
                })
                :
                <h3>No stops found for specified route and direction.</h3>
            }
        </div>
    )
}