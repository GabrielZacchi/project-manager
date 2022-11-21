import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, user }) {
    return user ?  children : <Navigate to="/signin" />
}

export default PrivateRoute;