const baseRoute = 'https://svc.metrotransit.org/nextripv2/';

const requestRoutes = async () => {
    try {
        const response = await fetch(`${baseRoute}routes`);

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No data received from api.');
        }
    } catch (e) {
        throw e;
    }
};

const requestRouteDetails = async (routeId) => {
    try {
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
    } catch (e) {
        throw e;
    }
};

const requestDirections = async (routeId) => {
    try {
        // Checking to make sure the route is a number or string
        if (typeof routeId !== 'number' && typeof routeId !== 'string') {
            throw new Error('Route was not of type number or string.');
        }

        const response = await fetch(`${baseRoute}directions/${routeId}`);

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No data received from api.');
        }
    } catch (e) {
        throw e;
    }
};

const requestDirectionDetails = async (routeId, directionId) => {
    try {
        // Checking to make sure the route is a number or string
        if (typeof routeId !== 'number' && typeof routeId !== 'string') {
            throw new Error('Route was not of type number or string.');
        }

        // Checking to make sure the direction is a number or string
        if (
            typeof directionId !== 'number' &&
            typeof directionId !== 'string'
        ) {
            throw new Error('Direction was not of type number or string.');
        }

        // Fetching directions
        const fetchedDirections = await requestDirections(routeId);

        const directionIdNumber = parseInt(directionId, 10);

        const selectedDirection = fetchedDirections.filter((direction) => {
            return directionIdNumber === direction.direction_id;
        });

        // Checking to make sure we found a hit
        if (selectedDirection.length <= 0) {
            throw new Error('Bad route or direction id.');
        } else {
            return selectedDirection[0];
        }
    } catch (e) {
        throw e;
    }
};

const requestStops = async (routeId, directionId) => {
    try {
        // Checking to make sure the route is a number or string
        if (typeof routeId !== 'number' && typeof routeId !== 'string') {
            throw new Error('Route was not of type number or string.');
        }

        // Checking to make sure the direction is a number or string
        if (
            typeof directionId !== 'number' &&
            typeof directionId !== 'string'
        ) {
            throw new Error('Direction was not of type number or string.');
        }

        const response = await fetch(
            `${baseRoute}stops/${routeId}/${directionId}`
        );

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No data received from api.');
        }
    } catch (e) {
        throw e;
    }
};

const requestStopInformation = async (routeId, directionId, stopId) => {
    try {
        // Checking to make sure the route is a number or string
        if (typeof routeId !== 'number' && typeof routeId !== 'string') {
            throw new Error('Route was not of type number or string.');
        }

        // Checking to make sure the direction is a number or string
        if (
            typeof directionId !== 'number' &&
            typeof directionId !== 'string'
        ) {
            throw new Error('Direction was not of type number or string.');
        }

        // Checking to make sure the stop is a string
        if (typeof stopId !== 'string') {
            throw new Error('Stop was not of type string.');
        }

        const response = await fetch(
            `${baseRoute}${routeId}/${directionId}/${stopId}`
        );

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No data received from api.');
        }
    } catch (e) {
        throw e;
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
