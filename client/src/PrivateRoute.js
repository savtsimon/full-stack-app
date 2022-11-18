import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (props) => {
    return (
        // If there is an authenticated user, continue to render the outlet routes
        // If no auth user, redirect to the signin page
        props.context.authenticatedUser ? <Outlet /> : <Navigate to="/signin" replace={true} />
    )
}

export default PrivateRoute