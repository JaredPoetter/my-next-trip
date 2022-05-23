import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
} from 'reactstrap';
import { requestRoutes } from '../api/api';

export default function TransitRoutes() {
    // Local state
    const [routes, setRoutes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [badRequest, setBadRequest] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    // Helper variables
    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();

    // Loading data when the component is mounted
    useEffect(() => {
        (async () => {
            try {
                const fetchedRoutes = await requestRoutes();
                setRoutes(fetchedRoutes);
            } catch (e) {
                setBadRequest(true);
                setErrorMessage(e.message);
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
        return <h2>Bad Request: {errorMessage}</h2>;
    }

    return (
        <div>
            <h2>Transit Routes</h2>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>Select Route</DropdownToggle>
                <DropdownMenu>
                    {routes.length > 0 ? (
                        routes.map((route, index) => {
                            return (
                                <DropdownItem
                                    key={`${route.route_id}-${index}`}
                                    onClick={() =>
                                        navigate(`route/${route.route_id}`)
                                    }
                                >
                                    {route.route_label}
                                </DropdownItem>
                            );
                        })
                    ) : (
                        <DropdownItem>No transit routes found.</DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
