import React, { useRef, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


let UpdateCourse = function (props) {
    const navigate = useNavigate()
    let params = useParams()
    let id = params.id

    let title = useRef()
    let description = useRef()
    let estimatedTime = useRef()
    let materialsNeeded = useRef()

    const { context } = props
    const [errors, setErrors] = useState([])
    const [valErrors, setValErrors] = useState([])

    useEffect(() => {
        context.data.getCourse(id)
            .then(res => {
                console.log("UPDATE 22", res)
                title.current.value = res.title
                description.current.value = res.description
                estimatedTime.current.value = res.estimatedTime
                materialsNeeded.current.value = res.materialsNeeded
                // res.userId
            })
    }, [])


    const handleSubmit = function (e) {
        e.preventDefault()
        // Update course
        const course = { title: title.current.value, description: description.current.value, estimatedTime: estimatedTime.current.value, materialsNeeded: materialsNeeded.current.value }
        console.log(course)
        context.data.updateCourse(course, id)
            .then(res => {
                if (res.length !== 0) {
                    console.log("update course 40", res)
                    setValErrors(<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {res.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>)
                } else {
                    navigate(`/courses/${id}`)
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/error');
            });
        // title.current.value = ""
        // description.current.value = ""
        // estimatedTime.current.value = ""
        // materialsNeeded.current.value = ""
    }

    const handleCancel = function (e) {
        e.preventDefault()
        navigate(`/courses/${id}`)
    }
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                {valErrors}
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