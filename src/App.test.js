import {
    findByText,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import uuid from 'uuid';
import crypto from 'crypto';

test('renders learn react link', async () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    const input = screen.getByText('My NextTrip App');

    // const movie = await findByText('My NextTrip App');

    // await waitFor(
    //     () => {
    //         expect(screen.getByText('My NextTrip App')).toBeInTheDocument();
    //     },
    //     { timeout: 2000 }
    // );

    // const linkElement = screen.getByText(/METRO Blue Line/i);
    // expect(linkElement).toBeInTheDocument();
});

test('Full app navigating', async () => {
    const history = createMemoryHistory();
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const user = userEvent.setup();

    // expect(screen.getByText(/My NextTrip App/i)).toBeInTheDocument();

    // Waiting for the data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(screen.getByText(/METRO Blue Line/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Clicking on the METRO Blue Line link
    await user.click(screen.getByText(/METRO Blue Line/i));

    // Waiting for the data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
            expect(screen.getByText(/Northbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Clicking on Northbound
    await user.click(screen.getByText(/Northbound/i));

    // Waiting for the data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Direction: Northbound/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Mall of America Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Clicking on Mall of America Station
    await user.click(screen.getByText(/Mall of America Station/i));

    //
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Direction: Northbound/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Stop: MOA Transit Station/i)
            ).toBeInTheDocument();
            expect(screen.getByText(/Information/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Accessing a bad page', () => {
    const history = createMemoryHistory();
    history.push('/a/junk/route');
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    expect(screen.getByText(/Bad Request/i)).toBeInTheDocument();
});

test('Requesting a random route id', async () => {
    const history = createMemoryHistory();
    const randomId = crypto.randomBytes(20).toString('hex');
    history.push(`/route/${randomId}`);
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    // Waiting and checking for bad request
    await waitFor(
        () => {
            expect(screen.getByText(/Bad Request/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a random direction id', async () => {
    const history = createMemoryHistory();
    const randomId = crypto.randomBytes(20).toString('hex');
    history.push(`/route/901/direction/${randomId}`);
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    // Waiting and checking for bad request
    await waitFor(
        () => {
            expect(screen.getByText(/Bad Request/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a random stop id', async () => {
    const history = createMemoryHistory();
    const randomId = crypto.randomBytes(20).toString('hex');
    history.push(`/route/901/direction/0/stop/${randomId}`);
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    // Waiting and checking for bad request
    await waitFor(
        () => {
            expect(screen.getByText(/Bad Request/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a good route id', async () => {
    const history = createMemoryHistory();
    history.push('/route/901');
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    // Waiting and checking for directions
    await waitFor(
        () => {
            expect(screen.getByText(/METRO Blue Line/i)).toBeInTheDocument();
            expect(screen.getByText(/Directions/i)).toBeInTheDocument();
            expect(screen.getByText(/Northbound/i)).toBeInTheDocument();
            expect(screen.getByText(/Southbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a good direction id', async () => {
    const history = createMemoryHistory();
    history.push('/route/901/direction/1');
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    // Waiting and checking for stops
    await waitFor(
        () => {
            expect(screen.getByText(/METRO Blue Line/i)).toBeInTheDocument();
            expect(screen.getByText(/Southbound/i)).toBeInTheDocument();
            expect(screen.getByText(/Stops/i)).toBeInTheDocument();
            expect(
                screen.getByText(/Target Field Station Platform 2/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Government Plaza Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a good stop id', async () => {
    const history = createMemoryHistory();
    history.push('/route/901/direction/1/stop/VAMC');
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );

    // Waiting and checking for stop information
    await waitFor(
        () => {
            expect(screen.getByText(/METRO Blue Line/i)).toBeInTheDocument();
            expect(screen.getByText(/Southbound/i)).toBeInTheDocument();
            expect(
                screen.getByText(/VA Medical Center Station/i)
            ).toBeInTheDocument();
            expect(screen.getByText(/Information/i)).toBeInTheDocument();
            expect(
                screen.getAllByText(/to Mall of America/i).length
            ).toBeGreaterThan(0);
        },
        { timeout: 2000 }
    );
});

// These might need to have a faked api
// test('good route but no directions')
// test('good direction but no stops')
// test('good stop but no departures')

// TODO random number generator
// requesting a random route id
// requesting a random direction id
// requesting a random stop id

// requesting a good route id
// requesting a good direction id
// requesting a good stop id
// checking for the table data

// verifying the back and forward functionality

//

// Testing Notes
// - https://testing-library.com/docs/example-react-router/

// Testing Plan
// FOR TESTING UP PUTTING IN DUMMY SCAFFOLDED data for the API Layer
// - Making sure the list of routes show up
// - Making sure the list of directions show up
// - Making sure the list of stops show up
// - Making sure the stop information shows up
// - Making sure the invalid path works i.e. /junk/
// - Making sure invalid url values don't break the app
// - Making sure the api functions are working
// - Making sure the back and forward in history works
// - Making sure the bread crumbs work
// - bad values being passed into each of the parameters
