import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addFollower, removeFollower } from './followingActions'
export const Follower = ({ followers, adFollower, rmFollower}) => {
	let _follower;
	// add new follower 
	const _addFollower = () => {
		if (_follower.value != "") {
			adFollower(_follower.value);
		}
	}
	//render each follower, rm follower func will be called by button
	const followerItems =followers.map((follower) => {
		return(
        	<div key={follower.id} className="follower">
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
					<button onClick={() => rmFollower(follower.id)}>
					<span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>	
        	</div>
        	);
	})

	return (
		<div className="follower-container">
		<input className="headline-input" name="follower" ref={(node) => _follower = node} placeholder="Add new follower"/>
		<button className="headline-update-button" onClick={_addFollower}><span className="glyphicon glyphicon-plus"></span></button>
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
  (state) => ({followers: state.followers}),
  (dispatch) => ({adFollower : (name) => dispatch(addFollower(name)),
  	rmFollower : (id) => dispatch(removeFollower(id))})
  )(Follower)