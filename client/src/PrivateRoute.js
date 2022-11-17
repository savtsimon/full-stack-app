import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (props) => {
    console.log("PRIVATE:", props, props.context)
    return (
        props.context.authenticatedUser ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default PrivateRoute