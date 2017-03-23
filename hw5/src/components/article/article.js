require('./article.css')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleView from './articleView'
import NewArticle from './newArticle'
import SearchBar  from './searchbar'
export const Article = () => {
	return (
		<div className="article-part">
			<NewArticle/>
			<SearchBar/>
			<ArticleView/>
		</div>
	)
}

export default connect(
  )(Article)
