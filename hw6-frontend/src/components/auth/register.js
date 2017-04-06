import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { handleSubmit, clearErr, navSignIn} from './authActions'

export const SignUp = ({submit, errorMessage, clear, navToSignIn}) => {
  //sign up component needs to transmit mulitple data, that's why we need so many variables
  let displayName;
  let email;
  let phone;
  let zip;
  let birthDate;
  let password;
  let confirmPassword;
  let failmsg;
  let failtxt = errorMessage;
  const _submit = () => {
    clear();
    submit({
      displayName: displayName ? displayName.value : null,
      email: email ? email.value : null,
      phone: phone ? phone.value : null,
      zip: zip? zip.value : null,
      birthDate: birthDate? birthDate.value : null,
      password: password? password.value : null,
      confirmPassword: confirmPassword? confirmPassword.value : null
    });
  }
  //conditional rendering error information
  if (errorMessage.length != 0) {
    failmsg = <div className="alert alert-danger alert-dismissable fade in" role="alert">
      <strong id='register_error'>{errorMessage}</strong>
      </div>;
  } else {
    failmsg = <div></div>;
  }
  return (
    <div className = "container">
      <div className = 'row'>
        <h1 className = "logo">RICE BOOK</h1>
      </div>
      <div className = 'row'>
    <div className="col-sm-4 col-sm-offset-4 card">
      <h1 className = "txt-align-center">Sign up</h1>
        <div><input className = "commoninput" id="register_displayName" type="text" ref={(node) => displayName = node} placeholder="Display name"/></div> 
        <div><input className = "commoninput" id="register_email" type="text" ref={(node) => email = node} placeholder="Email address"/></div>    
        <div><input className = "commoninput" id="register_phone" type="text" ref={(node) => phone = node} placeholder="Phone number"/></div> 
        <div><input className = "commoninput" id="register_zip" type="text" ref={(node) => zip = node} placeholder="Zip code"/></div> 
        <div><input className = "commoninput" id="register_birthDate" type="text" ref={(node) => birthDate = node} placeholder="Birth date: mm/dd/yyyy"/></div>
        <div><input className = "commoninput" id="register_password" type="password" ref={(node) => password = node} placeholder="Password"/></div> 
        <div><input className = "commoninput" id="register_confirmPassword" type="password" ref={(node) => confirmPassword = node} placeholder="Confirm password"/></div>
        <div><button id='register_submit' onClick={_submit} className="btn btn-primary pure-button">Submit</button></div>
      <div><p className = "txt-warning"> Already have an account? <a href = "#" onClick ={navToSignIn}>Sign in</a></p></div>
      {failmsg}
    </div> 
    </div>
    </div>
  )
}

SignUp.propTypes = {
  errorMessage : PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  navToSignIn: PropTypes.func.isRequired
}

export default connect(
  (state) => ({errorMessage: state.errorMsg}),
  (dispatch) => ({ submit: (info) => handleSubmit(info)(dispatch),
    clear: () => dispatch(clearErr()),
    navToSignIn: () => dispatch(navSignIn()) })
  )(SignUp)
