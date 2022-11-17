import React, { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom"
import Data from "../Data"


let CourseDetail = function (props) {
    const { context } = props
    const authUser = context.authenticatedUser;
    const [course, setCourse] = useState({})
    let [authButtons, setAuthButtons] = useState("")
    let params = useParams()
    let id = params.id
    let data = new Data()

    useEffect(() => {
        data.getCourse(id)
            .then(res => {
                setCourse(res)
                console.log(res)
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
        let data = new Data()
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
                            <p>By Joe Smith</p>
                            <ReactMarkdown children={course.description} />
                            {/* <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>

                            <p>Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.</p>

                            <p>Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.</p>

                            <p>We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.</p>

                            <p>As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.</p>

                            <p>The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</p> */}
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