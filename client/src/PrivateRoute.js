import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (props) => {
    let auth = { 'token': true }

    return (
        props.context.authenticatedUser ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default PrivateRoute