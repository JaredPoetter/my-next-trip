# My Next Trip App

This is a prototype to get route information from Metro Transit.

## Setup and Run

To set up and run the web app follow the steps below:

1. `git clone git@github.com:JaredPoetter/my-next-trip.git`
2. `cd my-next-trip`
3. `npm install`
4. `npm start`
5. Visit http://localhost:3000/

To run the automated tests run the steps below:

1. `npm install`
2. `npm test`

## Questions

-   What made you pick this code?
-   Why did you choose this framework?
-   How did your solution for this problem evolve over time?
-   What was the biggest challenge related to solving this problem?

## Assumptions

-   I wanted to have an easy way for someone to bookmark or send a link to a specific section of the web app and have the transit route, direction and stop filled. For example, if someone wanted to quickly figure out the times for the Northbound METRO Blue Line at the Mall of America Station stop, they just needed to click on the link 'http://localhost:3000/route/901/direction/0/stop/MAAM'.
-   Pulling in RESTapi data when switching routes instead of storing in a cache was to enable a user to send or bookmark a link to a specific URL. If they would load in http://localhost:3000/route/901/direction/0/stop/MAAM they would be able to get the most up to date information about that stop in the future.
-   using of reactstrap library to simplify styling of the web app so i could focus on the logic of the React.js code
-   i have limited my testing of the RESTapi because I didn't want to get rate limited from the metro transit
