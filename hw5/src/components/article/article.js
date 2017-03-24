require('./article.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleView from './articleView'
import NewArticle from './newArticle'
import SearchBar  from './searchbar'
export const Article = () => {
	return (
		<div className = "col-sm-12">
			<NewArticle/>
			<SearchBar/>
			<ArticleView/>
		</div>
	)
}

export default connect(
  )(Article)
