import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
} from 'reactstrap';
import {
    requestStops,
    requestRouteDetails,
    requestDirectionDetails,
} from '../api/api';
import RouteSelection from './route-selection';

export default function Stops() {
    // Local state
    const [transitRoute, setTransitRoute] = React.useState({});
    const [direction, setDirection] = React.useState({});
    const [stops, setStops] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    // Helper variables
    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();
    const params = useParams();

    // Loading data when the component is mounted
    useEffect(() => {
        (async () => {
            try {
                const fetchedRouteDetails = await requestRouteDetails(
                    params.routeId
                );
                setTransitRoute(fetchedRouteDetails);

                const fetchedDirectionDetails = await requestDirectionDetails(
                    params.routeId,
                    params.directionId
                );
                setDirection(fetchedDirectionDetails);

                const fetchedStops = await requestStops(
                    params.routeId,
                    params.directionId
                );
                setStops(fetchedStops);
            } catch (e) {
                setErrorMessage(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [params.routeId, params.directionId, params.stopId]);

    // Checking if we are still loading
    if (loading) {
        return <Spinner>Loading...</Spinner>;
    }

    // Checking if we had a bad request
    if (errorMessage) {
        return <h2>Bad Request: {errorMessage}</h2>;
    }

    return (
        <div>
            <RouteSelection
                route={transitRoute.route_label}
                direction={direction.direction_name}
            />
            <h2>Stops</h2>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>Select Stop</DropdownToggle>
                <DropdownMenu>
                    {stops.length > 0 ? (
                        stops.map((stop, index) => {
                            return (
                                <DropdownItem
                                    key={`${stop.place_code}-${index}`}
                                    onClick={() =>
                                        navigate(`stop/${stop.place_code}`)
                                    }
                                >
                                    {stop.description}
                                </DropdownItem>
                            );
                        })
                    ) : (
                        <DropdownItem>
                            No stops found for specified route and direction.
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
