import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addFollower, removeFollower } from './followingActions'
export const Follower = ({ followers, adFollower, rmFollower, errorMessage, successMs}) => {
	let _follower, failmsg
	// add new follower 
	const _addFollower = () => {
		if (_follower.value != "") {
			adFollower(_follower.value);
		}
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
	//render each follower, rm follower func will be called by button
	const followerItems =followers.map((follower) => {
		return(
        	<div key={follower.name} className="follower">
				<div className="media-left">
				<img className="followingImage" src={follower.avatar} />
				</div>	
				<div className="media-body">
				<div>
					<strong>{follower.name}</strong>
				</div>
				<div>
					<em>{follower.headline}</em>
				</div>
				</div>
				<div className="media-right">
					<button name='rmFollower' onClick={() => rmFollower(follower.name)}>
					<span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>	
        	</div>
        	);
	})

	return (
		<div className="follower-container">
		{failmsg}
		<input className="headline-input" id="follower" ref={(node) => _follower = node} placeholder="Add new follower"/>
		<button id='addFollower' className="headline-update-button" onClick={_addFollower}><span className="glyphicon glyphicon-plus"></span></button>
		{followerItems}
		</div>
	)
}

Follower.propTypes = {
    followers: PropTypes.array.isRequired,
    adFollower: PropTypes.func.isRequired,
    rmFollower: PropTypes.func.isRequired
}

export default connect(
  (state) => ({followers: state.followers,
  	errorMessage: state.errorMsg,
  	successMs: state.successMsg}),
  (dispatch) => ({adFollower : (name) => dispatch(addFollower(name)),
  	rmFollower : (id) => dispatch(removeFollower(id))})
  )(Follower)