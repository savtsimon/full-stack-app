import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import Data from "../Data"

const UserSignIn = function (props) {
    const { context } = props
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()

    let handleCancel = function (e) {
        e.preventDefault()
        navigate("/")
    }
    let handleSubmit = function (e) {
        e.preventDefault()
        // const user = { emailAddress: email.current.value, password: password.current.value }
        console.log("UserSignIn 19: ", email, password)
        context.actions.signIn(email.current.value, password.current.value)
            .then(() => {
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
                navigate('/error')
            })
        email.current.value = ""
        password.current.value = ""
    }
    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>

            </div>
        </main>
    )
}

export default UserSignIn