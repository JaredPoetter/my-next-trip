# My Next Trip App

This is a prototype to get route information from Metro Transit.

## Setup

To set up the web app follow the steps below:

1. `git clone git@github.com:JaredPoetter/my-next-trip.git`
2. `cd my-next-trip`
3. `npm install`
4. `npm start`
5. Visit http://localhost:3000/

## Run

To run the automated tests run the steps below:

1. `npm install`
2. `npm test`

## Build

To build a bundled version of the application run the steps below:

1. `npm install`
2. `npm run build`
3. Copy the `build` folder onto your web server.

## Assumptions

-   I assumed the data coming from the Metro Transit RESTapi would be consistent with their documentation.
-   Automated tests cover functionality as a 'smoke test'.
-   To productize this prototype, the React application would be bundled and served as a static single page application with browser-side rendering.
