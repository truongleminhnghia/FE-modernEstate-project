
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const currentUser = localStorage.getItem("user");
    if (!currentUser) {
        return <Navigate to='/' />
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.roleName)) {
        return <Navigate to="/login" />;
    }
    return <>{element}</>;
}

export default ProtectedRoute
