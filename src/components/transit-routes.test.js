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
import TransitRoutes from './transit-routes';

test.skip('Basic TransitRoutes', async () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <TransitRoutes />
        </Router>
    );
    const user = userEvent.setup();

    // Waiting for the routes to be loaded
    await waitFor(
        () => {
            expect(screen.getByText(/METRO Blue Line/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
    );

    // // Checking to make sure all of the routes are present
    // expect(screen.getAllByRole('a')).toEqual(136);

    expect(screen.getByText(/Transit Routes/i)).toBeInTheDocument();

    // Clicking on the METRO Blue Line link
    await user.click(screen.getByText(/METRO Blue Line/i));

    //
    expect(screen.getByText(/Route: METRO Blue Line/i)).toBeInTheDocument();
});
