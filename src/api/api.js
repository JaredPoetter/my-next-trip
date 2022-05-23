const baseRoute = 'https://svc.metrotransit.org/nextripv2';

/**
 * @description Getting the transit routes
 * @returns {Array} transit routes
 */
const requestRoutes = async () => {
    // Fetching routes
    const response = await fetch(`${baseRoute}/routes`);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('No data received from api.');
    }
};

/**
 * @description Getting the details for a specific transit route
 * @param {String | Number} routeId the id of the route to find
 * @returns {Object} route details
 */
const requestRouteDetails = async (routeId) => {
    // Checking to make sure the route is a number or string
    if (typeof routeId !== 'number' && typeof routeId !== 'string') {
        throw new Error('Route was not of type number or string.');
    }

    // Fetching routes
    const fetchedRoutes = await requestRoutes();

    // Looking for the specified route
    const selectedRoute = await fetchedRoutes.filter((route) => {
        return parseInt(routeId, 10) === parseInt(route.route_id, 10);
    });

    // Checking to make sure we found a hit
    if (selectedRoute.length <= 0) {
        throw new Error('Bad route id.');
    } else {
        return selectedRoute[0];
    }
};

/**
 * @description Getting the directions for a specified route
 * @param {String | Number} routeId the id for a route
 * @returns {Array} route directions
 */
const requestDirections = async (routeId) => {
    // Checking to make sure the route is a number or string
    if (typeof routeId !== 'number' && typeof routeId !== 'string') {
        throw new Error('Route was not of type number or string.');
    }

    // Fetching directions
    const response = await fetch(`${baseRoute}/directions/${routeId}`);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('No data received from api.');
    }
};

/**
 * @description Getting the details about a specific route direction
 * @param {String | Number} routeId the id for a route
 * @param {String | Number} directionId the id for a direction
 * @returns {Object} direction details
 */
const requestDirectionDetails = async (routeId, directionId) => {
    // Checking to make sure the route is a number or string
    if (typeof routeId !== 'number' && typeof routeId !== 'string') {
        throw new Error('Route was not of type number or string.');
    }

    // Checking to make sure the direction is a number or string
    if (typeof directionId !== 'number' && typeof directionId !== 'string') {
        throw new Error('Direction was not of type number or string.');
    }

    // Fetching directions
    const fetchedDirections = await requestDirections(routeId);

    // Looking for the specified direction
    const selectedDirection = fetchedDirections.filter((direction) => {
        return (
            parseInt(directionId, 10) === parseInt(direction.direction_id, 10)
        );
    });

    // Checking to make sure we found a hit
    if (selectedDirection.length <= 0) {
        throw new Error('Bad route or direction id.');
    } else {
        return selectedDirection[0];
    }
};

/**
 * @description Getting the stops for a specified route and direction
 * @param {String | Number} routeId the id for a route
 * @param {String | Number} directionId the id for a direction
 * @returns {Array} route stops
 */
const requestStops = async (routeId, directionId) => {
    // Checking to make sure the route is a number or string
    if (typeof routeId !== 'number' && typeof routeId !== 'string') {
        throw new Error('Route was not of type number or string.');
    }

    // Checking to make sure the direction is a number or string
    if (typeof directionId !== 'number' && typeof directionId !== 'string') {
        throw new Error('Direction was not of type number or string.');
    }

    // Fetching stops
    const response = await fetch(
        `${baseRoute}/stops/${routeId}/${directionId}`
    );

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('No data received from api.');
    }
};

/**
 * @description Getting the information about a stop for a specified route, direction and stop
 * @param {String | Number} routeId the id for a route
 * @param {String | Number} directionId the id for a direction
 * @param {String} stopId the id for a stop
 * @returns {Object} information about the stop
 */
const requestStopInformation = async (routeId, directionId, stopId) => {
    // Checking to make sure the route is a number or string
    if (typeof routeId !== 'number' && typeof routeId !== 'string') {
        throw new Error('Route was not of type number or string.');
    }

    // Checking to make sure the direction is a number or string
    if (typeof directionId !== 'number' && typeof directionId !== 'string') {
        throw new Error('Direction was not of type number or string.');
    }

    // Checking to make sure the stop is a string
    if (typeof stopId !== 'string') {
        throw new Error('Stop was not of type string.');
    }

    // Fetching stop information
    const response = await fetch(
        `${baseRoute}/${routeId}/${directionId}/${stopId}`
    );

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('No data received from api.');
    }
};

export {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
    requestRouteDetails,
    requestDirectionDetails,
};
