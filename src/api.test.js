import {
    requestDirectionDetails,
    requestDirections,
    requestRouteDetails,
    requestRoutes,
    requestStopInformation,
    requestStops,
} from './api';

///////////////////
// requestRoutes //
///////////////////
test('requestRoutes: getting the routes', async () => {
    const transitRoutes = await requestRoutes();

    const expectedTransitRouteSubset = [
        { route_id: '901', agency_id: 0, route_label: 'METRO Blue Line' },
        { route_id: '902', agency_id: 0, route_label: 'METRO Green Line' },
        { route_id: '906', agency_id: 10, route_label: 'Airport Shuttle' },
    ];

    // Checking to see if there are some correct transit routes present
    expect(transitRoutes).toEqual(
        expect.arrayContaining(expectedTransitRouteSubset)
    );
});

///////////////////////
// requestDirections //
///////////////////////
test('requestDirections: getting the directions with a good route id', async () => {
    const routeId = 901;
    const directions = await requestDirections(routeId);

    const expectedDirections = [
        { direction_id: 0, direction_name: 'Northbound' },
        { direction_id: 1, direction_name: 'Southbound' },
    ];

    // Checking to see if the correct directions are returned
    expect(directions).toEqual(expectedDirections);
});

test('requestDirections: getting the directions with a bad route id', async () => {
    const routeId = 9999999;

    try {
        await requestDirections(routeId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('No data received from api.');
    }
});

test('requestDirections: getting the directions with a wrong type for route id', async () => {
    const routeId = [1, 2, 3];

    try {
        await requestDirections(routeId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Route was not of type number or string.');
    }
});

//////////////////
// requestStops //
//////////////////
test('requestStops: getting the stops with a good route id and direction id', async () => {
    const routeId = 901;
    const directionId = 0;

    const stops = await requestStops(routeId, directionId);

    const expectedStops = [
        { place_code: 'MAAM', description: 'Mall of America Station' },
        { place_code: '28AV', description: '28th Ave Station' },
        { place_code: 'BLCT', description: 'Bloomington Central Station' },
        { place_code: 'AM34', description: 'American Blvd Station' },
        {
            place_code: 'HHTE',
            description: 'MSP Airport Terminal 2 - Humphrey Station',
        },
        {
            place_code: 'LIND',
            description: 'MSP Airport Terminal 1 - Lindbergh Station',
        },
        { place_code: 'FTSN', description: 'Fort Snelling Station' },
        { place_code: 'VAMC', description: 'VA Medical Center Station' },
        {
            place_code: '50HI',
            description: '50th St/ Minnehaha Park Station',
        },
        { place_code: '46HI', description: '46th St Station' },
        { place_code: '38HI', description: '38th St Station' },
        { place_code: 'LAHI', description: 'Lake St/ Midtown Station' },
        { place_code: 'FRHI', description: 'Franklin Ave Station' },
        { place_code: 'CDRV', description: 'Cedar-Riverside Station' },
        { place_code: 'USBA', description: 'U.S. Bank Stadium Station' },
        { place_code: 'GOVT', description: 'Government Plaza Station' },
        { place_code: '5SNI', description: 'Nicollet Mall Station' },
        {
            place_code: 'WARE',
            description: 'Warehouse District/ Hennepin Ave Station',
        },
        { place_code: 'TF1', description: 'Target Field Station Platform 1' },
        { place_code: 'TF2', description: 'Target Field Station Platform 2' },
    ];

    // Checking to see if the correct stops are returned
    expect(stops).toEqual(expectedStops);
});

test('requestStops: getting the stops with a bad route id and direction id', async () => {
    const routeId = 999999;
    const directionId = 999999;

    try {
        await requestStops(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('No data received from api.');
    }
});

test('requestStops: getting the stops with a wrong type for route id', async () => {
    const routeId = [1, 2, 3];
    const directionId = 999999;

    try {
        await requestStops(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Route was not of type number or string.');
    }
});

test('requestStops: getting the stops with a wrong type for direction id', async () => {
    const routeId = 999999;
    const directionId = [1, 2, 3];

    try {
        await requestStops(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Direction was not of type number or string.');
    }
});

////////////////////////////
// requestStopInformation //
////////////////////////////
test('requestStopInformation: getting the stop information with a good route id and direction id and stop id', async () => {
    const routeId = 901;
    const directionId = 0;
    const stopId = 'MAAM';

    const stopInformation = await requestStopInformation(
        routeId,
        directionId,
        stopId
    );

    // Checking to make sure there are properties of the stop information object
    expect(stopInformation).toHaveProperty('stops');
    expect(stopInformation).toHaveProperty('alerts');
    expect(stopInformation).toHaveProperty('departures');
});

test('requestStopInformation: getting the stops information with a bad route id and direction id and stop id', async () => {
    const routeId = 999999;
    const directionId = 111111;
    const stopId = 'abcdefg';

    try {
        await requestStopInformation(routeId, directionId, stopId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('No data received from api.');
    }
});

test('requestStopInformation: getting the stops information with a wrong type for route id', async () => {
    const routeId = [1, 2, 3];
    const directionId = 111111;
    const stopId = 'abcdefg';

    try {
        await requestStopInformation(routeId, directionId, stopId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Route was not of type number or string.');
    }
});

test('requestStopInformation: getting the stops information with a wrong type for direction id', async () => {
    const routeId = 999999;
    const directionId = [1, 2, 3];
    const stopId = 'abcdefg';

    try {
        await requestStopInformation(routeId, directionId, stopId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Direction was not of type number or string.');
    }
});

test('requestStopInformation: getting the stops information with a wrong type for stop id', async () => {
    const routeId = 999999;
    const directionId = 111111;
    const stopId = [1, 2, 3];

    try {
        await requestStopInformation(routeId, directionId, stopId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Stop was not of type string.');
    }
});

/////////////////////////
// requestRouteDetails //
/////////////////////////
test('requestRouteDetails: getting the route details with a good route id', async () => {
    const routeId = 901;

    const routeDetails = await requestRouteDetails(routeId);

    const expectedRouteDetails = {
        route_id: '901',
        agency_id: 0,
        route_label: 'METRO Blue Line',
    };

    // Checking to see if the correct route details are returned
    expect(routeDetails).toEqual(expectedRouteDetails);
});

test('requestRouteDetails: getting the route details with a bad route id', async () => {
    const routeId = 222222;

    try {
        await requestRouteDetails(routeId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Bad route id.');
    }
});

test('requestRouteDetails: getting the route details with a wrong type for route id', async () => {
    const routeId = [1, 2, 3];

    try {
        await requestRouteDetails(routeId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Route was not of type number or string.');
    }
});

/////////////////////////////
// requestDirectionDetails //
/////////////////////////////
test('requestDirectionDetails: getting the direction details with a good route id and direction id', async () => {
    const routeId = 901;
    const directionId = 0;

    const directionDetails = await requestDirectionDetails(
        routeId,
        directionId
    );

    const expectedDirectionDetails = {
        direction_id: 0,
        direction_name: 'Northbound',
    };

    // Checking to see if the correct direction details are returned
    expect(directionDetails).toEqual(expectedDirectionDetails);
});

test('requestDirectionDetails: getting the direction details with a good route id and bad direction id', async () => {
    const routeId = 901;
    const directionId = 222222;

    try {
        await requestDirectionDetails(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Bad route or direction id.');
    }
});

test('requestDirectionDetails: getting the direction details with a bad route id and direction id', async () => {
    const routeId = 111111;
    const directionId = 222222;

    try {
        await requestDirectionDetails(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('No data received from api.');
    }
});

test('requestDirectionDetails: getting the direction details with a wrong type for route id', async () => {
    const routeId = [1, 2, 3];
    const directionId = 0;

    try {
        await requestDirectionDetails(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Route was not of type number or string.');
    }
});

test('requestDirectionDetails: getting the direction details with a wrong type for direction id', async () => {
    const routeId = 901;
    const directionId = [1, 2, 3];

    try {
        await requestDirectionDetails(routeId, directionId);

        // Catching if the code above does not throw an error
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('Direction was not of type number or string.');
    }
});
