import React, { useEffect, useState } from "react"
import context from '../Context';

let Header = function () {
    let [buttons, setButtons] = useState([])
    const authUser = context.authenticatedUser
    console.log("Header 6", authUser)
    useEffect(() => {
        if (authUser !== null) {
            console.log("Header 10", buttons)
            setButtons((
                <span>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </span>
            ))
            console.log("Header 17", buttons)
        } else {

            setButtons((
                <li><a href="/signout">Sign Out</a></li>
            ))
        }
    }, [])

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        {buttons}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header