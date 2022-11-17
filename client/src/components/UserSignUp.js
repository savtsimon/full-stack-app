// import React, { useState, useEffect } from "react"
import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"

const UserSignUp = function (props) {
    const { context } = props
    console.log(context)
    const navigate = useNavigate()
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()

    const [valErrors, setValErrors] = useState([])

    const handleCancel = function (e) {
        e.preventDefault()
        navigate("/")
    }
    const handleSubmit = function (e) {
        e.preventDefault()
        // Create user
        console.log("UserSignUp23:", password.current.value)
        const user = { "firstName": firstName.current.value, "lastName": lastName.current.value, "emailAddress": email.current.value, "password": password.current.value }
        console.log("UserSignUp23:", user)
        context.data.createUser(user)
            .then(res => {
                console.log("sign up 29", res)
                if (res.length) {
                    setValErrors((<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {res.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>))
                }
                else {
                    console.log("UserSignUp 37: ", email, password)
                    context.actions.signIn(email.current.value, password.current.value)
                        .then(() => {
                            navigate('/')
                        })
                        .catch(console.log)
                }
            })
            .catch((err) => {
                console.log(err)
                navigate('/error')
            })
    }
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {valErrors}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstName} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastName} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
            </div>
        </main>
    )
}
export default UserSignUp