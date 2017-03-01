require('./auth.css')
import React from 'react'
import { connect } from 'react-redux'
import SignUp from './register'
import SignIn from './login'

export const Landing = ({location}) => {
    let view
    if (location == 'signUp') {
        view = <SignUp/>
    } else {
        view = <SignIn/>
    }
    return (
        <div>
            { view }
        </div>
    )
}

export default connect((state) => {
    return { location: state.location }
})(Landing)