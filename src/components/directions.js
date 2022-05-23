import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
} from 'reactstrap';
import { requestDirections, requestRouteDetails } from '../api/api';
import RouteSelection from './route-selection';

export default function Directions() {
    // Local state
    const [transitRoute, setTransitRoute] = React.useState({});
    const [directions, setDirections] = React.useState([]);
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

                const fetchedDirections = await requestDirections(
                    params.routeId
                );
                setDirections(fetchedDirections);
            } catch (e) {
                setErrorMessage(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [params.routeId]);

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
            <RouteSelection route={transitRoute.route_label} />
            <h2>Directions</h2>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>Select Direction</DropdownToggle>
                <DropdownMenu>
                    {directions.length > 0 ? (
                        directions.map((direction, index) => {
                            return (
                                <DropdownItem
                                    key={`${direction.direction_id}-${index}`}
                                    onClick={() => {
                                        navigate(
                                            `direction/${direction.direction_id}`
                                        );
                                    }}
                                >
                                    {direction.direction_name}
                                </DropdownItem>
                            );
                        })
                    ) : (
                        <DropdownItem>
                            No directions found for specified route.
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
