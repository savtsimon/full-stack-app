import React from "react"
import { useNavigate } from "react-router-dom"
import Data from "../Data"


let UserSignOut = function (props) {
    let { context } = props
    let navigate = useNavigate()

    context.actions.signOut()
        .then(() => {
            navigate('/')
        })
        .catch(console.log)
    return (
        <main>
            <div>
            </div>
        </main>
    )
}

export default UserSignOut