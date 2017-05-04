import moment from 'moment'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateComments, addAvatar} from './articleActions'
const ContentEditable = require('react-contenteditable');
/*
	rendering each comment iteratively, including avatar, author, content, time
*/
export const Comment = ({comments, article, username, update, avatar, followers}) => {
	const commentItems = comments.map((comment) => {
		const date = moment(new Date(comment.date));
		let _avatar = addAvatar(comment.author) || 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
		let _comment = comment.text
		let _html = `${_comment}`
		return(
			<div key={comment._id}>
			<ul className='comments-list'>
	          <li className='comment'>
	            <a className='pull-left' href='#'>
	                <img className='avatar' src={_avatar} alt='avatar'/>
	            </a>
	            <div className='comment-body'>
	                <div className='comment-heading'>
	                    <h4 className='user'>{comment.author}</h4>
	                    <h5 className='time'>{date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}</h5>
	                    {(comment.author == username) && <button type='button' className='btn btn-default commentupdate' 
	               	onClick={e => {update({commentId: comment._id, text: _comment, articleId: article._id})}}><span className='glyphicon glyphicon-pencil' /></button>}
	                </div>
	                {(comment.author != username) && <p ref={(node)=>_comment = node}>{comment.text}</p>}
	                {(comment.author == username) && <ContentEditable  html={_html} onChange={e => {_comment = e.target.value}} />} 
	            </div>
	          </li>
	        </ul>
	        </div>
        )
	})
	return(
		<div>
		{commentItems}
		</div>
	)
}

export default connect (
  (state) => ({
  	username: state.username,
  	isEditComment: state.isCommentEdit,
  	avatar: state.avatar,
	followers: state.followers}),
  (dispatch) => ({
  	update: (text) => updateComments(text)(dispatch)
  	})
  )(Comment)


