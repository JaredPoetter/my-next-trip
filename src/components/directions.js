import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { requestRoutes, requestDirections, requestStops, requestStopInformation } from "./../api";

export default function Directions() {
    // constructor() {
    //     super();
    //     this.state = {
    //         routes: [],
    //         directions: [],
    //         stops: [],
    //         stopInformation: {},
    //         selectedRoute: '',
    //         selectedDirection: '',
    //         selectedStop: '',
    //     }
    // }
        
    // componentDidMount = () => {
    //     const params = useParams();

    //     requestDirections(params.routeId).then((directions) => { 
    //         console.log('directions', directions)

    //         // Storing the directions
    //         this.setState({ directions: directions })
    //     });
    // }

    const [directions, setDirections] = React.useState([])
    const params = useParams();

    useEffect(() => {
        requestDirections(params.routeId).then((directions) => {
            // debugger
            console.log('directions', directions)
            // Storing the directions
            setDirections(directions)
        });
    }, []);
    
    
    // render() {
        // const params = useParams();
        return (
            <div>
                <h2>Directions</h2>
                {directions.length > 0 ?
                    directions.map((direction, index) => {
                        return (<div key={`${direction.direction_id}-${index}`}><Link to={`/route/${params.routeId}/direction/${direction.direction_id}`}>{direction.direction_name}</Link><br/></div>)
                    })
                    :
                    <h3>No directions found for specified route.</h3>
                }
            </div>
        )
    // }
}