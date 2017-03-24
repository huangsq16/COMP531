
import moment from 'moment'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Comment } from './comment'

import { addArticle, searchKeyword } from './articleActions'
export const ArticleView = ({articles}) => {
	// render each article
	const articleItems = articles.map((article) => {
		const date = moment(new Date(article.date));
		return (
        	<div key={article._id + Math.random() * 10}>
		        <div className="panel panel-white post panel-shadow">
		            <div className="post-heading">
		                <div className="pull-left image">{article.img &&<img src={article.img} className="img-circle avatar" alt="user profile image"/>}</div>
		                <div className="pull-left meta">
		                    <div className="title h5"><a href="#"><b>{article.author}</b></a></div>
		                    <h6 className="text-muted time">{date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}</h6>
		                </div>
		                <div className="article-edit"><a href="#"><i className="glyphicon glyphicon-pencil article-edit"></i></a></div>
		            </div> 
		            <div className="post-description">{article.img && <img id="img1" className="img_respoonsive" src={article.img} alt="Image"/> }<p>{article.text}</p></div>
		            <div className="post-footer">
		                <form > 
		                	<div className="commentinline">
		                    <input className="commentinput" placeholder="Add a comment" type="text"/>
		                    <button type="button" className="btn btn-default submit"><span className="glyphicon glyphicon-pencil" ></span></button>
							<button type="reset" className="btn btn-default reset" ><span className="glyphicon glyphicon-trash" ></span></button>
							</div>
		                </form>
		               <Comment comments={article.comments}/>
		            </div>
		        </div>
			</div>
        );
	});

	return (
		<div>
			{articleItems}
		</div>
	)
}

ArticleView.propTypes = {
    articles: PropTypes.array.isRequired
}

export default connect(
  (state) => ({articles: state.filteredArticles}),
  (dispatch) => ({})
  )(ArticleView)