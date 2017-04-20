import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Avatar = ({avatar}) => {
	return (
		<div className="user-avatar">
      		<img className="img_respoonsive" src={avatar}/>
      	</div>
	)
}
/*
Avatar.propTypes = {
   avatar: PropTypes.string.isRequired
}
*/
export default connect(
  (state) => ({avatar: state.avatar})
 )(Avatar)