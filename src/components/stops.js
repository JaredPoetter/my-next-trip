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
    requestDirectionDetails,
} from './../api';

export default function Stops() {
    const [transitRoute, setTransitRoute] = React.useState({});
    const [direction, setDirection] = React.useState({});
    const [stops, setStops] = React.useState([]);
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
            <h3>Direction: {direction.direction_name}</h3>
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
