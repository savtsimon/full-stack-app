import React, { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import { Navigate, useParams, useNavigate } from "react-router-dom"


const CourseDetail = function (props) {
    const navigate = useNavigate()
    const { context } = props
    const authUser = context.authenticatedUser;
    const [course, setCourse] = useState({})
    const [authButtons, setAuthButtons] = useState("")
    const [name, setName] = useState("")
    let params = useParams()
    let id = params.id

    useEffect(() => {
        context.data.getCourse(id)
            .then(res => {
                setName(res.User.firstName + " " + res.User.lastName)
                setCourse(res)
                if (authUser !== null && res.User.emailAddress === authUser.emailAddress) {
                    setAuthButtons((
                        <span>
                            <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                            <a className="button" href="/" onClick={handleDelete}>Delete Course</a>
                        </span>
                    ))
                }
            })
    }, [])

    const handleDelete = function () {
        context.data.deleteCourse(id)
            .then(res => {
                navigate("/")
            })
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {authButtons}
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {name}</p>
                            <ReactMarkdown children={course.description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <div className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>

    )
}

export default CourseDetail