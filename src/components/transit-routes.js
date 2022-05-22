// import { Dropdown } from 'bootstrap';
// import { Button } from 'bootstrap';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    List,
    Spinner,
} from 'reactstrap';
import { requestRoutes } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TransitRoutes() {
    const [routes, setRoutes] = React.useState([]);
    const [badRequest, setBadRequest] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();

    // Getting the bus routes
    useEffect(() => {
        (async () => {
            try {
                const fetchedRoutes = await requestRoutes();
                setRoutes(fetchedRoutes);
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
