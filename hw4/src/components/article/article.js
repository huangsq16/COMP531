require('./article.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleView from './articleView'
export const Article = () => {
	return (
		<div>
			<ArticleView/>
		</div>
		)
}

export default connect(
(state) => ({articles: state.article}),
(dispatch) => ({})
  )(Article)
