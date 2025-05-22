
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const userString = localStorage.getItem("user")
    if (!userString) {
        return <Navigate to='/' />
    }

    // Parse chuỗi JSON thành object
    const currentUser = JSON.parse(userString)

    if (allowedRoles && !allowedRoles.includes(currentUser?.role?.roleName)) {
        return <Navigate to="/login" />
    }

    console.log("role", currentUser?.role?.roleName)
    return <>{element}</>
}

export default ProtectedRoute
