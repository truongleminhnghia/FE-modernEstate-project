import React from 'react'
import { Navigate } from 'react-router-dom';
import { ROLES } from '../constants/roles';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const userString = localStorage.getItem("user")
    if (!userString) {
        return <Navigate to='/login' />
    }

    const currentUser = JSON.parse(userString)
    const userRole = currentUser?.role?.roleName

    console.log("Current user role:", userRole); 
    console.log("Allowed roles:", allowedRoles);

    if (!Object.values(ROLES).includes(userRole)) {
        console.log("Invalid role detected"); 
        return <Navigate to="/*" />
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.log("Access denied for role:", userRole); 
        return <Navigate to="/*" />
    }

    return <>{element}</>
}

export default ProtectedRoute
