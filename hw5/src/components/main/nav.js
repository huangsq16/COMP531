import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {navProfile, navMain, navLanding} from './mainActions'

export const Nav = ({flag, logout, profile, main}) => {
	let link
	if (flag == 1) {
		link = <li><a href="#" onClick={profile}>Profile</a></li>
	} else if (flag == 0) {
		link = <li><a href="#" onClick={main}>Main</a></li>
	}
	//render navigate bar
	return (
		<div>
			<nav className="navbar navbar-inverse navbar-helper">
				<div className="container-fluid">
					<div className="navbar-header">
					  <strong className="navbar-brand navbar-brand-helper">RiceBook</strong>
					</div>
					<div className="nav navbar-nav navbar-right">
						<ul className="nav navbar-nav">
							{link}
							<li><a href="#" onClick={logout}>Logout</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}

Nav.propTypes = {
    flag: PropTypes.number.isRequired,
    logout: PropTypes.func.isRequired,
    profile: PropTypes.func.isRequired,
    main: PropTypes.func.isRequired
}

export default connect(
	(state) => ({flag: state.flag}),
	(dispatch) => ({logout: () => dispatch(navLanding()),
		profile: () => dispatch(navProfile()),
		main: () => dispatch(navMain())})
)(Nav)
