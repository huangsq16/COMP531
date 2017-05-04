require('./main.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SimpleProfile  from './simpleprofile'
import Article from '../article/article'
import Nav from './nav'

export const Main = () => {
	return(
		<div className="container">
			<div className = "row">
			<Nav/>
			</div>
			<div className="row">
				<div className = "col-sm-3 col-sm-offset-1 simpleprofile-part">
				<SimpleProfile/>
				</div>
				<div className = "col-sm-7 simpleprofile-part">
				<Article/>
				</div>
			</div>
		</div>
		)
}

export default connect()(Main)