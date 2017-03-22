require('./main.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SimpleProfile  from './simpleprofile'
import Article from '../article/article'
import Nav from './nav'

export const Main = () => {
	return(
		<div>
			<Nav/>
			<div className="row">
				<SimpleProfile/>
				<Article/>
			</div>
		</div>
		)
}

export default connect()(Main)