import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateProfile, clearErr} from './profileActions'
import Avatar from './avatar.js'
export const ProfileForm = ({userinfo, update, clear, errorMessage, successMs}) => {
  let headline;
  let displayName;
  let email;
  let phone;
  let zip;
  let birthDate;
  let password;
  let confirmPassword;
  let failmsg;
  let failtxt = errorMessage;
  const _update = () => {
    clear();
    update({
      firstName: userinfo.firstName,
      lastName: userinfo.lastName,
      userHeadline: headline.value != "" ? headline.value : userinfo.userHeadline,
      userAvatar: userinfo.userAvatar,
      displayName: displayName.value != "" ? displayName.value : userinfo.displayName,
      email: email.value != "" ? email.value : userinfo.email,
      phone: phone.value != "" ? phone.value : userinfo.phone,
      zip: zip.value != "" ? zip.value : userinfo.zip,
      birthDate: userinfo.birthDate,
      password: password.value != "" ? password.value : userinfo.password,
      confirmPassword: confirmPassword.value.length != "" ? confirmPassword.value : userinfo.confirmPassword
    }, userinfo);
  }

  //conditional rendering error information
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

  //return content be rendered
  return (
    <div className="profile-card">
      <Avatar/>
      <div className="update-container">
        <input className="upload-inline" type="file" accept="image/*"></input>
        <button type="submit" className="update-button" onClick={_update}><i className="glyphicon glyphicon-pencil"></i> Update</button>
      </div>
      <div>
      {failmsg}
      </div>
      <div className="user-profile">
        <div className="user-info">
        <p>Headline:</p>
        <input className="update-info" placeholder={userinfo.userHeadline} name="headline" ref={(node) => headline = node}/>
        </div>
        <div className="user-info">
        <p>Display name:</p>
        <input className="update-info" placeholder={userinfo.displayName} name="displayName" ref={(node) => displayName = node}/>
        </div>
        <div className="user-info">
        <p>Email:</p>
        <input className="update-info" placeholder={userinfo.email} name="email" ref={(node) => email = node}/>
        </div>
        <div className="user-info">
        <p>Phone:</p>
        <input className="update-info" placeholder={userinfo.phone} name="phone" ref={(node) => phone = node}/>
        </div>
        <div className="user-info">
        <p>Zip:</p>
        <input className="update-info" placeholder={userinfo.zip} name="zip" ref={(node) => zip = node}/>
        </div>
        <div className="user-info">
        <p>Birth date:</p>
        <input className="update-info" placeholder={userinfo.birthDate} name="birthDate" ref={(node) => birthDate = node} disabled/>
        </div>
        <div className="user-info">
        <p>Password:</p>
        <input className="update-info" name="password" ref={(node) => password = node} />
        </div>
        <div className="user-info">
        <p>Confirm Password:</p>
        <input className="update-info" name="confirmPassword" ref={(node) => confirmPassword = node}/>
        </div>
      </div>
    </div>
  )
}


ProfileForm.propTypes = {
    userinfo: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    successMs: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
}

export default connect(
  (state) => ({userinfo: state.userinfo,
    errorMessage: state.errorReg,
    successMs: state.successMsg}),
  (dispatch) => ({clear: () => dispatch(clearErr()), 
    update: (updateinfo, userinfo) => dispatch(updateProfile(updateinfo, userinfo))})
  )(ProfileForm)
