import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { navMain, handleLogin, navSignUp, clearErr } from './authActions'

export const SignIn = ({login, clear, navToSignUp, errorMessage, successMs}) => {
  let username;
  let password;
  let failmsg;
  // fake login, we let any user can access the main page
  const _login = () => {
    clear();
    login({
      username: username ? username.value : null,
      password: password ? password.value : null
    });
  }
  if (errorMessage.length != 0) {
    failmsg = <div className="alert alert-danger alert-dismissable fade in" role="alert">
      <p>{errorMessage}</p>
      </div>;
  } else if (successMs.length != 0) {
    failmsg = <div className="alert alert-success alert-dismissable fade in" role="alert">
      <p>{successMs}</p>
      </div>;
  } else {
    failmsg = <div></div>
  }
  // return content to be rendered
  return (
    <div className = "container">
      <div className = "row">
        <div className = "col-sm-6 col-sm-offset-3">
        <h1 className = "logo">RICE BOOK</h1>
        </div>
      </div>
      <div className = "row">
        <div className="col-sm-4 col-sm-offset-4 card">
          <h1 className = "txt-align-center">Sign In</h1>
            <div>
                <input className = "commoninput" name="username" type="text" ref={(node) => username = node} placeholder="User Name"/>
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
      {failmsg}
    </div>
  )
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  navToSignUp: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
}

export default connect(
  (state) => ({errorMessage: state.errorMsg,
    successMs: state.successMsg}),
  (dispatch) => ({ login: (info) => handleLogin(info)(dispatch),
  navToSignUp: () => dispatch(navSignUp()),clear: () => dispatch(clearErr()) })
  )(SignIn)
