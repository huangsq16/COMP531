import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { handleSubmit, clearErr, navSignIn} from './authActions'

export const SignUp = ({submit, errorMessage, clear, navToSignIn}) => {
  let firstName;
  let lastName;
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
      firstName: firstName ? firstName.value : null,
      lastName: lastName ? lastName.value : null,
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
      <strong>{errorMessage}</strong>
      </div>;
  } else {
    failmsg = <div></div>;
  }

  //return content be rendered
  return (
    <div>
      <div>
        <h1 className = "logo">RICE BOOK</h1>
      </div>
    <div className="card">
      <h1 className = "txt-align-center">Sign up</h1>
      <div>
      <input className = "firstname" name="firstName" type="text" ref={(node) => firstName = node} placeholder="First Name" maxLength = "32"/>
      <input className = "lastname" name="lastName" type="text" ref={(node) => lastName = node} placeholder="Last Name" maxLength = "32"/>
      </div>
        <div>
            <input className = "commoninput" name="displayName" type="text" ref={(node) => displayName = node} placeholder="Display name"/>
        </div> 
        <div>
            <input className = "commoninput" name="email" type="text" ref={(node) => email = node} placeholder="Email address"/>
        </div>    
        <div>
            <input className = "commoninput" name="phone" type="text" ref={(node) => phone = node} placeholder="Phone number"/>
        </div> 
        <div>
            <input className = "commoninput" name="zip" type="text" ref={(node) => zip = node} placeholder="Zip code"/>
        </div> 
        <div>
            <input className = "commoninput" name="birthDate" type="text" ref={(node) => birthDate = node} placeholder="Birth date: mm/dd/yyyy"/>
        </div>
        <div>
            <input className = "commoninput" name="password" type="password" ref={(node) => password = node} placeholder="Password"/>
        </div> 
        <div>
          <input className = "commoninput" name="confirmPassword" type="password" ref={(node) => confirmPassword = node} placeholder="Confirm password"/>
        </div>
        <div>
        <button onClick={_submit} className="btn btn-primary pure-button">Submit</button>
        </div>
      <div>
        <p className = "txt-warning"> Already have an account? <a href = "#" onClick ={navToSignIn}>Sign in</a></p>
      </div>
      {failmsg} 
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
  (state) => ({errorMessage: state.errorReg}),
  (dispatch) => ({ submit: (info) => dispatch(handleSubmit(info)),
                    clear: () => dispatch(clearErr()),
                    navToSignIn: () => dispatch(navSignIn()) })
  )(SignUp)
