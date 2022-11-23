import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import NoMatch from "./pages/404";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import NewProjectPage from "./pages/NewProject";
import EditProjectPage from "./pages/EditProject";

function RoutesHandler(props) {
    const {user} = props;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignInPage user={user}/>} />
                <Route path="/signup" element={<SignUpPage user={user}/>} />
                <Route path="/home" element={<PrivateRoute user={user}><HomePage user={user} /></PrivateRoute>} />
                <Route path="/project" element={<PrivateRoute user={user}><NewProjectPage user={user} /></PrivateRoute>} />
                <Route path="/project/:id" element={<PrivateRoute user={user}><EditProjectPage user={user} /></PrivateRoute>} />
                <Route path="*" element={<PrivateRoute user={user}><NoMatch /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesHandler;