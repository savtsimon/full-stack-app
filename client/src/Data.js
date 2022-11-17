import config from './config'
import Cookies from 'js-cookie'

export default class Data {
    api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        const cookie = Cookies.get("credentials")
        console.log(cookie)
        if (cookie) {
            const creds = JSON.parse(cookie)
            console.log(creds)
            options.headers["Authorization"] = this.encodeCredentials(creds)
        }
        // else if (requiresAuth) {
        // options.headers["Authorization"] = this.encodeCredentials(credentials)
        // const creds = `${credentials.emailAddress}:${credentials.password}`
        // const encodedCredentials = btoa(creds)
        // console.log(encodedCredentials)
        // options.headers["Authorization"] = `Basic ${encodedCredentials}`
        // this.authHeader = `Basic ${encodedCredentials}`
        // console.log("DATA AUTH:", this.authHeader)
        // }

        return fetch(url, options)
    }

    encodeCredentials(credentials) {
        const creds = `${credentials.emailAddress}:${credentials.password}`
        const encodedCreds = btoa(creds)
        return `Basic ${encodedCreds}`
    }

    async getCourses() {
        const courses = await this.api("/courses", "GET")
        if (courses.status === 200) {
            return courses.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async getCourse(id) {
        const course = await this.api(`/courses/${id}`, 'GET', null)
        if (course.status === 200) {
            return course.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async createCourse(course) {
        const response = await this.api('/courses', 'POST', course, true)
        console.log("DATA 67:", response)
        if (response.status === 201) {
            return []
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            })
        } else {
            throw new Error()
        }
    }
    async updateCourse(courseForm, id) {
        const course = await this.api(`/courses/${id}`, 'PUT', courseForm)
        console.log("DATA-70: ", course)
        if (course.status === 204) {
            return []
            // return course.json().then(data => data)
        } else if (course.status === 400) {
            return course.json().then(data => {
                return data.errors
            })
        } else {
            throw new Error()
        }
    }
    async deleteCourse(id) {
        const course = await this.api(`/courses/${id}`, 'DELETE', null)
        console.log("DATA-79: ", course)
        if (course.status === 204) {
            return [course.json().then(data => data)]
            // return course.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    async getUser(creds) {
        const response = await this.api(`/users`, 'GET', null, true, creds)
        console.log("DATA-88: ", response)
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