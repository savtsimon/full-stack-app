import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Data from "../Data"


let CreateCourse = function (props) {
    const navigate = useNavigate()
    const { context } = props
    const authUser = context.authenticatedUser;
    // console.log(authUser)
    // if (!authUser) {
    //     navigate("/signin")
    // }
    const title = useRef()
    const description = useRef()
    const estimatedTime = useRef()
    const materialsNeeded = useRef()

    let [valErrors, setValErrors] = useState([])
    let handleCancel = function (e) {
        e.preventDefault()
        navigate("/")
    }
    let handleSubmit = function (e) {
        e.preventDefault()
        // Create course
        const course = { title: title.current.value, description: description.current.value, estimatedTime: estimatedTime.current.value, materialsNeeded: materialsNeeded.current.value }
        console.log(course)
        context.data.createCourse(course)
            .then(res => {
                console.log("create course 27", res)
                if (res.length) {
                    console.log("create course 29", res)
                    setValErrors(<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {res.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>)
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/error');
            });
    }
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {/* {valErrors} */}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} />
                            {/* <p>By {authUser.firstName} {authUser.lastName}</p> */}
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default CreateCourse