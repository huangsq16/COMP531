import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Follower from './following'
import { updateHeadline } from './mainActions'
export const SimpleProfile = ({userInfo, updatehl}) => {
	let displayName
	const _updatehl = () => {
		updatehl(displayName ? displayName.value : "")
	}
	// different from profile, it's a simplified version of profile.
	const simpleProfile = (
		<div className="simpleprofile-part col-sm-offset-2">
			<div className="thumbnail">	
				<h3 className="txt-align-center">{userInfo.displayName}</h3>	
	          	<img id="img1" className="img_respoonsive" src={userInfo.userAvatar} alt="Avatar"/>
	          	<div className="caption">
	              	<div>
	        		<input className = "headline-input" name="displayName" type="text" ref={(node) => displayName = node} placeholder={userInfo.userHeadline}/>
	        		<button onClick={_updatehl} className="headline-update-button" >
						<span className="glyphicon glyphicon-pencil"></span>
					</button>
	    			</div> 
	          	</div>		
	    	</div>
			<Follower/>
    	</div>)
	return (
		<div>
		{simpleProfile}
		</div>
	)
}

SimpleProfile.propTypes = {
    userInfo: PropTypes.object.isRequired,
    updatehl: PropTypes.func.isRequired
}

export default connect(
  (state) => ({userInfo: state.userinfo,
  				}),
  (dispatch) => ({updatehl: (text) => dispatch(updateHeadline(text))})
  )(SimpleProfile)