require('./profile.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ProfileForm from './profileForm'
import Nav from '../main/nav'

export const Profile = () => {
  return (
    <div className = "container">
    	<div className = "row">
      		<Nav/>
      	</div>
      	<div className = "row">
      		<div className = "col-sm-4 col-sm-offset-4">
      		<ProfileForm/>
      		</div>
      	</div>
    </div>
    )
}

export default connect(
  )(Profile)