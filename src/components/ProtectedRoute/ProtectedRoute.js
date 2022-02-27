import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    console.log(props.loggedIn, '000')
    return props.loggedIn ? <Outlet /> : <Navigate to='/' />
};

export default ProtectedRoute;