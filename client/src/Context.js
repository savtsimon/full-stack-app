import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Data from './Data'

const Context = React.createContext()

export class Provider extends Component {

  constructor() {
    super()
    this.cookie = Cookies.get('authenticatedUser')
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    }
    this.data = new Data()
  }

  render() {
    const { authenticatedUser } = this.state
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }


  signIn = async (emailAddress, password) => {
    console.log("SIGN-IN-38: ", emailAddress, password)
    const creds = { "emailAddress": emailAddress, "password": password }
    const cookieOptions = {
      "expires": 1
    }
    Cookies.set("credentials", JSON.stringify(creds), cookieOptions)
    const user = await this.data.getUser(creds)
    if (user !== null) {
      this.setState(() => {
        return {
          "authenticatedUser": user,
        }
      })
      Cookies.set("authenticatedUser", JSON.stringify(user), cookieOptions)
    }
    return user
  }

  signOut = () => {
    this.setState({ "authenticatedUser": null })
    Cookies.remove("authenticatedUser")
    Cookies.remove("credentials")
  }
}

export const Consumer = Context.Consumer

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component, props = []) {
  return (
    <Context.Consumer>
      {context => <Component {...props} context={context} />}
    </Context.Consumer>
  )
}
