import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import TransitRoutes from './components/transit-routes';
import Directions from './components/directions';
import Stops from './components/stops';
import Information from './components/information';
import BadRequest from './components/bad-request';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default function App() {
    // const params = useParams();
    // console.log(params);

    // https://reactstrap.github.io/?path=/docs/components-breadcrumb--breadcrumb
    const pathArray = window.location.pathname.substring(1).split('/');

    return (
        <div>
            <h1>My NextTrip App</h1>

            {/* <Breadcrumb>
                {pathArray.map((pathItem, index) => {
                    if (index % 2 === 0) {
                        return <BreadcrumbItem>{pathItem}</BreadcrumbItem>;
                    }
                })}
                <BreadcrumbItem active></BreadcrumbItem>
            </Breadcrumb> */}

            <Routes>
                <Route path="/" element={<TransitRoutes />} />
                <Route path="/route/:routeId" element={<Directions />} />
                <Route
                    path="/route/:routeId/direction/:directionId"
                    element={<Stops />}
                />
                <Route
                    path="/route/:routeId/direction/:directionId/stop/:stopId"
                    element={<Information />}
                />
                <Route path="*" element={<BadRequest />}></Route>
            </Routes>
        </div>
    );
}
