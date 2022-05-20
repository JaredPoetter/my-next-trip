import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { requestStopInformation } from "../api";
import DepatureList from "./departure-list";

export default function Information() {
    const [information, setInformation] = React.useState({})
    const params = useParams();
    
    // requestDirections(params.routeId).then((directions) => {
    //     console.log('directions', directions)
    //     // Storing the directions
    //     setDirections(directions)
    // });

        // // Getting the information for the selected route, direction and stop
        // requestStopInformation(this.state.selectedRoute, this.state.selectedDirection, stopId)
        // .then((information) => {
        //     console.log('information', information)
        //     this.setState({ stopInformation: information })
        // })


    useEffect(() => {
        // Getting the stops for the selected route and direction
        requestStopInformation(params.routeId, params.directionId, params.stopId)
        .then((information) => {
            // debugger
            console.log('information', information)
            // Storing the information
            setInformation(information)
        })
        .catch(() => {
            console.log('catching the error from rest call') // TODO
        })
    }, [])
    
    return (
        <div>
            <h2>Information</h2>
            {information && information.departures && information.departures.length > 0 ? 
                <DepatureList
                    departureData={information}
                />
                : ''
            }
            {information && information.departures && information.departures.length === 0 ? 
                <h3>No departures at this time.</h3> : ''
            }
            {information && information.departures ? 
                '' : <h3>No information found for specified route, direction and stop.</h3>
            }
        </div>
    )
}