import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Avatar = ({userinfo}) => {
	return (
		<div className="user-avatar">
      		<img className="img_respoonsive" src={userinfo.userAvatar}/>
      	</div>
		)
}

Avatar.propTypes = {
    userinfo: PropTypes.object.isRequired
}

export default connect(
  (state) => ({userinfo: state.userinfo})
 )(Avatar)