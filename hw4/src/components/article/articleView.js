
import moment from 'moment'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NewArticle from './newArticle'
import { Comment } from './comment'
import SearchBar  from './searchbar'
import { addArticle, searchKeyword } from './articleActions'
export const ArticleView = ({articles}) => {
	//sort article by date
	
	const sortedArticles = articles.sort(function(a, b) {
            let x = new Date(a.date)
            let y = new Date(b.date)
            return ((x>y) ? -1 :((x<y)?1:0))
        });
	// render each article
	const articleItems = sortedArticles.map((article) => {
		const date = moment(new Date(article.date));
		return (
        	<div key= {article.id} className="container">
			    <div className="article-card-part">
			        <div className="panel panel-white post panel-shadow">
			            <div className="post-heading">
			                <div className="pull-left image">
			                    <img src={article.img} className="img-circle avatar" alt="user profile image"/>
			                </div>
			                <div className="pull-left meta">
			                    <div className="title h5">
			                        <a href="#"><b>{article.author}</b></a>
			                    </div>
			                    <h6 className="text-muted time">{date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}</h6>
			                </div>
			                <div className="article-edit">
			                	<a href="#"><i className="glyphicon glyphicon-pencil article-edit"></i></a>  
			                </div>
			            </div> 
			            <div className="post-description">
			            	<img id="img1" className="img_respoonsive" src="http://img.hb.aicdn.com/08653c6e238c66f8e04a40abab5f6992f544856e5172a-2exdOm_sq320" alt="Image"/> 
			                <p>{article.text}</p>
			            </div>
			            <div className="post-footer">
			                <form className="commentinline"> 
			                    <input className="commentinput" placeholder="Add a comment" type="text"/>
			                    <button type="button" className="btn btn-default submit">
								  <span className="glyphicon glyphicon-pencil" ></span>
								</button>
								<button type="reset" className="btn btn-default reset" >
								  <span className="glyphicon glyphicon-trash" ></span>
								</button>
			                </form>
			               <Comment comments={article.comments}/>
			            </div>
			        </div>
			    </div>
			</div>
        	);
	});

	return (
		<div className="article-part">
			<NewArticle/>
			<SearchBar/>
			{articleItems}
		</div>
	)
}

ArticleView.propTypes = {
    articles: PropTypes.array.isRequired
}

export default connect(
  (state) => ({articles: state.article}),
  (dispatch) => ({})
  )(ArticleView)