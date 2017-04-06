import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addArticle, handleImageChange } from './articleActions'

export const NewArticle = ({articleContent='write something', addtext, avatar})=> {
	let _text
	const _add = () => {
		addtext({
			text: _text.value, 
		})
	}
	//render text area test
	return (
    	<div className='status-update'>
    		<div className= 'container-text-area'>
    			<form>
				<textarea id='newArticle' className='text-area' defaultValue = {articleContent} ref={(node) => _text = node} ></textarea>
				<div className='uploadContainer'>
					<input  className='uploadinline' type='file' accept='image/*' onChange={(e) => handleImageChange(e)}></input>
					<button id='uploadNewArticle' type='button' onClick={_add} className='btn btn-default uploadContainer-submit'><span className='glyphicon glyphicon-pencil' ></span></button>
					<button type='reset' className='btn btn-default uploadContainer-reset' ><span className='glyphicon glyphicon-trash' ></span></button>
				</div>
				</form>
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
		addtext: (text) => addArticle(text)(dispatch)
	})
)(NewArticle)
