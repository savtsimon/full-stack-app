import React, { useEffect, useState } from "react"

const Header = function (props) {
    const [buttons, setButtons] = useState([])
    let { context } = props

    useEffect(() => {
        if (!context.authenticatedUser) {
            setButtons((
                <span>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </span>
            ))
        } else {
            setButtons((
                <li><a href="/signout" onClick={context.actions.signOut}>Sign Out</a></li>
            ))
        }
    }, [context])

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