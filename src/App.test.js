import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import crypto from 'crypto';

afterAll(cleanup);

test('Full app navigating', async () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const user = userEvent.setup();

    // Waiting for the transit route data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(screen.getByText(/METRO Blue Line/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Selecting the METRO Blue Line option
    await user.selectOptions(screen.getByRole('combobox'), 'METRO Blue Line');

    // Waiting for the direction data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Northbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Selecting the Northbound option
    await user.selectOptions(screen.getByRole('combobox'), 'Northbound');

    // Waiting for the stop data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Direction: Northbound/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Mall of America Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Selecting the Mall of America Station
    await user.selectOptions(
        screen.getByRole('combobox'),
        'Mall of America Station'
    );

    // Waiting for the stop information to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Direction: Northbound/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Stop: MOA Transit Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Information/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Go back to the stops page
    window.history.back();

    // Waiting for the stop data to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Direction: Northbound/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Mall of America Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // Go forward to the stop information page
    window.history.forward();

    // Waiting for the stop information to show from the Metro RESTapi
    await waitFor(
        () => {
            expect(
                screen.getByText(/Route: METRO Blue Line/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Direction: Northbound/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Stop: MOA Transit Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Information/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Accessing a bad page', () => {
    const history = createMemoryHistory();

    // Accessing a bad page
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

    // Accessing a bad page
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

    // Accessing a bad page
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

    // Accessing a bad page
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

    // Accessing a good page
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
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Directions/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Northbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Southbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a good direction id', async () => {
    const history = createMemoryHistory();

    // Accessing a good page
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
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Southbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Stops/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Target Field Station Platform 2/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/Government Plaza Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/38th St Station/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/46th St Station/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
});

test('Requesting a good stop id', async () => {
    const history = createMemoryHistory();

    // Accessing a good page
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
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Southbound/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getByText(/VA Medical Center Station/i)
            ).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(screen.getByText(/Information/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );
    await waitFor(
        () => {
            expect(
                screen.getAllByText(/to Mall of America/i).length
            ).toBeGreaterThan(0);
        },
        { timeout: 2000 }
    );
});
