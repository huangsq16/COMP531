import moment from 'moment'
import React, { PropTypes } from 'react'
export const Comment = (props) => {
	const commentItems = props.comments.map((comment) => {
		const date = moment(new Date(comment.date));
		return(
			<div key={comment.id}>
			<ul className="comments-list">
	          <li className="comment">
	            <a className="pull-left" href="#">
	                <img className="avatar" src="http://img.hb.aicdn.com/08653c6e238c66f8e04a40abab5f6992f544856e5172a-2exdOm_sq320" alt="avatar"/>
	            </a>
	            <div className="comment-body">
	                <div className="comment-heading">
	                    <h4 className="user">{comment.author}</h4>
	                    <h5 className="time">{date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}</h5>
	                </div>
	                <p>{comment.text}</p>
	            </div>
	          </li>
	        </ul>
	        </div>
        );
	});
	return(
		<div>
		{commentItems}
		</div>
	);
};


