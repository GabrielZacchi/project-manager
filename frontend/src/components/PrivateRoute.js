import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../api/Auth';

function PrivateRoute({ user, children }) {
    return user || isLogin() ?  children : <Navigate to="/signin" />
}

export default PrivateRoute;