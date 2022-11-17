import React from "react"
import { Navigate } from "react-router-dom"


let UserSignOut = function (props) {
    // const navigate = useNavigate()
    // useEffect(() => {
    // console.log(props.context)
    // props.context.actions.signOut()
    // navigate('/')
    // }, [])

    return (
        // <div onClick={props.context.actions.signOut}>
        <Navigate to='/' />
        // </div>
    )
}

export default UserSignOut