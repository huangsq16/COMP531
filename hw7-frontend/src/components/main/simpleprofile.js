import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Follower from './following'
import { updateHeadline } from './mainActions'
export const SimpleProfile = ({username, avatar, headline, updatehl}) => {
	let displayName
	const _updatehl = () => {
		updatehl(displayName ? displayName.value : "")
	}
	// different from profile, it's a simplified version of profile.
	const simpleProfile = (
		<div className="thumbnail">	
			<h3 className="txt-align-center">{username}</h3>	
          	<img id="img1" className="img_respoonsive" src={avatar} alt="Avatar"/>
          	<div className="caption">
        		<input className = "headline-input" id='simple-headline' type="text" ref={(node) => displayName = node} placeholder={headline}/>
        		<button id='update-simple-headline' onClick={_updatehl} className="headline-update-button" ><span className="glyphicon glyphicon-pencil"></span></button>
          	</div>		
    	</div>
    )
	return (
		<div className="col-sm-12">
		{simpleProfile}
		<Follower/>
		</div>
	)
}
/*
SimpleProfile.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    updatehl: PropTypes.func.isRequired
}
*/
export default connect(
  (state) => ({username: state.username,
  				avatar: state.avatar,
  				headline: state.headline
  				}),
  (dispatch) => ({updatehl: (text) => dispatch(updateHeadline(text))})
  )(SimpleProfile)