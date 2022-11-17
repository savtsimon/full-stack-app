import config from './config'

export default class Data {
    api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        if (requiresAuth) {
            console.log(credentials)
            const creds = `${credentials.emailAddress}:${credentials.password}`
            console.log(creds)
            const encodedCredentials = btoa(creds)
            console.log(encodedCredentials)
            // const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
            options.headers["Authorization"] = `Basic ${encodedCredentials}`
        }

        return fetch(url, options)
    }

    async getCourses() {
        const courses = await this.api("/courses", "GET")
        // console.log("DATA-28: ", courses)
        if (courses.status === 200) {
            return courses.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async getCourse(id) {
        const course = await this.api(`/courses/${id}`, 'GET', null)
        // console.log("DATA-37: ", course)
        if (course.status === 200) {
            return course.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async createCourse(course) {
        const response = await this.api('/courses', 'POST', course)
        if (response.status === 201) {
            return []
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            })
        }
        else {
            throw new Error()
        }
    }
    async updateCourse(courseForm) {
        const course = await this.api(`/courses/${courseForm.id}`, 'PUT', courseForm)
        console.log("DATA-37: ", course)
        if (course.status === 200) {
            return course.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async deleteCourse(id) {
        const course = await this.api(`/courses/${id}`, 'DELETE', null)
        console.log("DATA-37: ", course)
        if (course.status === 200) {
            return course.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async getUser(creds) {
        const response = await this.api(`/users`, 'GET', null, true, creds)
        console.log("DATA-78: ", response)
        if (response.status === 200) {
            return response.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async createUser(user) {
        const response = await this.api('/users', 'POST', user)
        console.log(response)
        if (response.status === 201) {
            return []
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            })
        }
        else {
            throw new Error()
        }
    }
}