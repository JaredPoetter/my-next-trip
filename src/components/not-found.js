import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { requestStopInformation } from '../api';
import DepatureList from './departure-list';

export default function NotFound() {
    return <h2>Nothing found.</h2>;
}
