require('./profile.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ProfileForm from './profileForm'
import Nav from '../main/nav'

export const Profile = () => {
  return (
    <div>
      <Nav/>
      <ProfileForm/>
    </div>
    )
}

export default connect(
  )(Profile)