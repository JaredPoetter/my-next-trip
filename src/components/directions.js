import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    List,
    Spinner,
} from 'reactstrap';
import {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
    requestRouteDetails,
} from './../api';

export default function Directions() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [directions, setDirections] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();
    const params = useParams();

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
                setBadRequest(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Checking if we are still loading
    if (loading) {
        return <Spinner>Loading...</Spinner>;
    }

    // Checking if we had a bad request
    if (badRequest) {
        return <h2>Bad Request</h2>;
    }

    return (
        <div>
            <h3>Route: {transitRoute.route_label}</h3>
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
