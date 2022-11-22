import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import NoMatch from "./pages/404";
import SignInPage from "./pages/SignIn";

function RoutesHandler(props) {
    const {user} = props;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignInPage user={user} />} />
                <Route path="*" element={<PrivateRoute user={user}><NoMatch /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesHandler;