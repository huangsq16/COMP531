import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addArticle } from './articleActions'

export const NewArticle = ({addtext, avatar}) => {
	let _text
	const _add = () => {
		addtext({
			text: _text.value, 
		}, avatar)
	}
	//render text area test
	return (
		<div className="container">
	    	<div className="row">
		    	<div className="status-update">
		    		<div className= "container-text-area">
		    			<form>
						<textarea className="text-area" placeholder="What are you doing right now?"  ref={(node) => _text = node} ></textarea>
						<div className="uploadContainer">
							<input className="uploadinline" type="file"></input>
							<button type="reset" className="resettext"> reset </button>
						</div>
						</form>
						<button className="text-submit" onClick={_add} >Submit</button>
					</div>
				</div>
		    </div>
		</div>
	)
}


NewArticle.propTypes = {
    addtext: PropTypes.func.isRequired
}

export default connect (
	(state) => ({avatar: state.avatar}),
	(dispatch) => ({
		addtext: (text, avatar) => addArticle(text, avatar)(dispatch)
	})
)(NewArticle)
