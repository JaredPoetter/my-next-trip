import axios from 'axios';

const baseRoute = 'https://svc.metrotransit.org/nextripv2/';

function requestRoutes() {
    return axios.get(`${baseRoute}routes`).then((response) => {
        // Error handling
        if (response === null || response.data === null) {
            throw 'No data received from api.';
        }

        if (response.status !== 200) {
            throw 'Problem with https://svc.metrotransit.org/nextripv2/routes';
        }

        return response.data;
    });
}

function requestDirections(route) {
    // Checking to make sure the route is a number or string
    if (typeof route !== 'number' && typeof route !== 'string') {
        throw 'Route was not of type number or string';
    }

    return axios.get(`${baseRoute}directions/${route}`).then((response) => {
        // Error handling
        if (response === null || response.data === null) {
            throw 'No data received from api.';
        }

        if (response.status !== 200) {
            throw 'Problem with https://svc.metrotransit.org/nextripv2/directions/:directionId';
        }

        return response.data;
    });
}

function requestStops(route, direction) {
    // Checking to make sure the route is a number or string
    if (typeof route !== 'number' && typeof route !== 'string') {
        throw 'Route was not of type number or string';
    }

    // Checking to make sure the direction is a number or string
    if (typeof direction !== 'number' && typeof direction !== 'string') {
        throw 'Direction was not of type number or string';
    }

    return axios
        .get(`${baseRoute}stops/${route}/${direction}`)
        .then((response) => {
            // Error handling
            if (response === null || response.data === null) {
                throw 'No data received from api.';
            }

            if (response.status !== 200) {
                throw 'Problem with https://svc.metrotransit.org/nextripv2/stops/:routeId/:directionId';
            }

            return response.data;
        });
}

function requestStopInformation(route, direction, stop) {
    // Checking to make sure the route is a number or string
    if (typeof route !== 'number' && typeof route !== 'string') {
        throw 'Route was not of type number or string';
    }

    // Checking to make sure the direction is a number or string
    if (typeof direction !== 'number' && typeof direction !== 'string') {
        throw 'Direction was not of type number or string';
    }

    // Checking to make sure the stop is a string
    if (typeof direction !== 'string') {
        throw 'Stop was not of type string';
    }

    return axios
        .get(`${baseRoute}${route}/${direction}/${stop}`)
        .then((response) => {
            // Error handling
            if (response === null || response.data === null) {
                throw 'No data received from api.';
            }

            if (response.status !== 200) {
                throw 'Problem with https://svc.metrotransit.org/nextripv2/:routeId/:directionId/:stopId';
            }

            return response.data;
        });
}

export {
    requestRoutes,
    requestDirections,
    requestStops,
    requestStopInformation,
};
