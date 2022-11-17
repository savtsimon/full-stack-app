import React, { useRef, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Data from "../Data"


let UpdateCourse = function (props) {
    const navigate = useNavigate()
    let params = useParams()
    let id = params.id
    let data = new Data()

    let title = useRef()
    let description = useRef()
    let estimatedTime = useRef()
    let materialsNeeded = useRef()

    let [errors, setErrors] = useState([])
    let valErrs = ""


    useEffect(() => {
        data.getCourse(id)
            .then(res => {
                title.current.value = res.title
                description.current.value = res.description
                estimatedTime.current.value = res.estimatedTime
                materialsNeeded.current.value = res.materialsNeeded
            })
    }, [])

    const { context } = props

    const handleSubmit = function (e) {
        e.preventDefault()
        data.updateCourse({})
        // Update course
        const course = { title: title.current.value, description: description.current.value, estimatedTime: estimatedTime.current.value, materialsNeeded: materialsNeeded.current.value }
        console.log(course)
        context.data.updateCourse(course)
            .then(errors => {
                if (errors.length) {
                    setErrors({ errors });
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/error');
            });
        title.current.value = ""
        description.current.value = ""
        estimatedTime.current.value = ""
        materialsNeeded.current.value = ""
    }
    if (errors.length) {
        valErrs = <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {errors.map(error => {
                    <li>{error}</li>
                })}
            </ul>
        </div>
    }
    // USE REQ.BODY TO RE FILL IN THE FORM IF NOT VALIDATED PROPERLY
    const handleCancel = function (e) {
        e.preventDefault()
        navigate(`/courses/${id}`)
    }
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                            <p>By Joe Smith</p>

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
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse