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
	                <img className="avatar" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg" alt="avatar"/>
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


