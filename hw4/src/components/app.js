import React from 'react'
import { connect } from 'react-redux'
import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'
const App = ({location, errorMessage}) => {

    let view
    if (location == 'main') {
        view = <Main/>
    } 
    else if (location == 'profile') {
        view = <Profile/>
    } else {
        view = <Landing/>
    }
    return (
        <div>
            { view }
        </div>
    )
}

export default connect((state) => {
    return { location: state.location }
})(App)