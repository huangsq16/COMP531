import moment from 'moment'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import  Comment  from './comment'
import { addArticle, updateComments, updateArticle, addAvatar } from './articleActions'
import { filterArticle } from '../../actions'
const ContentEditable = require('react-contenteditable');

/*
	Rendering article part, if the author of article is same as user, then make the corresponding article to be editable and will be 
	a pencil icon showed on top right
*/
export const ArticleView = ({articles, username, isEdit, editArticle, _updateArticle, _updateComment, avatar, followers }) => {
	// render each article
	let count = 0
	const articleItems = articles.map((article) => {
		if (article.author == username) {count++}
		let testid = `${article.author}-${count}`
		let testupdateid =`${article.author}-${count}-update`
		let _comment
		let _id = article._id
		let _text = article.text
		let _html = `${_text}`
		let _avatar = addAvatar(article.author) || 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
		const date = moment(new Date(article.date));
		return (
        	<div key={_id + Math.random() * 100} name='totalArticles'>
		        <div className='panel panel-white post panel-shadow'>
		            <div className='post-heading'>
		                <div className='pull-left image'>
		                <img src={_avatar} className='img-circle avatar' alt='user profile image'/>
		                </div>
		                <div className='pull-left meta'><div className='title h5'><a href='#'><b>{article.author}</b></a></div>
		                <h6 className='text-muted time'>{date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}</h6>
		                </div>
		                {article.author == username && <button id={testupdateid} type='button' className='btn article-edit' onClick={e => { _updateArticle({text: _text, articleId: _id})}}><span className='glyphicon glyphicon-pencil'/></button>}
		            </div> 
		            {article.author != username && <div className='post-description'>{article.img && <img id='img1' className='img_responsive' src={article.img} alt='Image'/>}<p>{article.text}</p></div>}
		            {article.author == username && <div className='post-description'>{article.img && <img id='img1' className='img_responsive' src={article.img} alt='Image'/> }
		            <ContentEditable  id={testid} html={_html} onChange={e => {_text = e.target.value}} /></div>}
		            <div className='post-footer'>
		                <form> 
		                	<div className='commentinline'>
			                    <input className='commentinput' placeholder='Add a comment' type='text' ref={(node) => _comment = node}/>
			                    <button type='button' className='btn btn-default submit' onClick={e => _updateComment({text: _comment.value, commentId: "-1", articleId: _id})}>
			                    <span className='glyphicon glyphicon-pencil' ></span></button>
								<button type='reset' className='btn btn-default reset' ><span className='glyphicon glyphicon-trash'>
								</span></button>
							</div>
		                </form>
		               <Comment comments={article.comments} article={article}/>
		            </div>
		        </div>
			</div>
        );
	});

	return (
		<div id='all_articles'>
			{articleItems}
		</div>
	)
}

export default connect(
  (state) => ({articles: filterArticle(state.article, state.keyword, state.followers),
  	username: state.username,
  	isEdit: state.isEdit,
  	avatar: state.avatar,
	followers: state.followers
  }),
  (dispatch) => ({_updateArticle: (o) => updateArticle(o)(dispatch),
  _updateComment: (o) => updateComments(o)(dispatch)
  })
)(ArticleView)