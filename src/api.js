import axios from 'axios';

const baseRoute = 'https://svc.metrotransit.org/nextripv2/';

function requestRoutes() {
    return axios.get(`${baseRoute}routes`).then((response) => {
        // console.log(`requestBusRoutes response`, response);
        if (response.status !== 200) {
            // error
            // TODO: need to handle
        }

        return response.data;
    });
}

function requestDirections(route) {
    // Checking to make sure the route a number
    if (typeof route !== 'number') {
        console.error('Error: route was not of type number.');
    }

    return axios.get(`${baseRoute}directions/${route}`).then((response) => {
        // console.log('requestDirections response', response);
        if (response.status !== 200) {
            // error
            // TODO: need to handle
        }

        // console.log()
        return response.data;
    });
}

function requestStops(route, direction) {
    // Checking to make sure the route is a number
    if (typeof route !== 'number') {
        console.error('Error: route was not of type number.');
    }

    // Checking to make sure the direction is a number
    if (typeof direction !== 'number') {
        console.error('Error: direction was not of type number.');
    }

    return axios
        .get(`${baseRoute}stops/${route}/${direction}`)
        .then((response) => {
            console.log('requestDirections response', response);
            if (response.status !== 200) {
                // error
                console.error(
                    `Error: Could not find any bus stops for route ${route} and direction ${direction}`
                );
                // TODO: need to handle
            }

            // console.log()
            return response.data;
        });
}

function requestStopInformation(route, direction, stop) {
    // Checking variables
    // TODO:

    return axios
        .get(`${baseRoute}${route}/${direction}/${stop}`)
        .then((response) => {
            if (response.status !== 200) {
                // error
                console.error(
                    `Error: Could not find any bus stops for route ${route} and direction ${direction}`
                );
                // TODO: need to handle
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
