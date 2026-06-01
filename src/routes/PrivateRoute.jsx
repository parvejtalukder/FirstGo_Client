import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loader from '../utility/Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();


    if (loading) {
        // return <><span className="loading loading-infinity loading-xl"></span></>
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;