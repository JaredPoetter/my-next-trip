import {
    findByText,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

test('renders learn react link', async () => {
    render(<App />);

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

test('Full app rendering and navigating', async () => {
    const history = createMemoryHistory();
    render(<App />);
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
