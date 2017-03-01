import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { navMain, handleLogin, navSignUp, clearErr } from './authActions'

export const SignIn = ({login, user, clear, navToSignUp}) => {
  let email;
  let password;

  // fake login, we let any user can access the main page
  const _login = () => {
    clear();
    login({
      email: email ? email.value : null,
      password: password? password.value : null
    }, user);
  }
  
  // return content to be rendered
  return (
    <div>
        <div>
        <h1 className = "logo">RICE BOOK</h1>
        </div>

    <div className="card">
      <h1 className = "txt-align-center">Sign In</h1>
        <div>
            <input className = "commoninput" name="email" type="text" ref={(node) => email = node} placeholder="Email address"/>
        </div>    
        <div>
            <input className = "commoninput" name="password" type="password" ref={(node) => password = node} placeholder="Password"/>
        </div> 
        <div>
        <button onClick={_login} className="btn btn-primary pure-button">Sign In</button>
        </div>
        <div>
        <p className = "txt-warning"> New User? <a href = "#" onClick ={navToSignUp}>Register</a></p>
      </div>
    </div>
    </div>
  )
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  navToSignUp: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
}

export default connect(
  (state) => ({user : state.userinfo}),
  (dispatch) => ({ login: (info, userinfo) => dispatch(handleLogin(info, userinfo)),
  navToSignUp: () => dispatch(navSignUp()),clear: () => dispatch(clearErr()) })
  )(SignIn)
