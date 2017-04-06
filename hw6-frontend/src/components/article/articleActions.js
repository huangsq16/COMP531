import { FILTER_KEYWORD, POST, FETCH_ARTICLES, EDIT_REQUEST, UPDATE_ARTICLES, EDIT_COMMENT_REQUEST, UPDATE_COMMENTS, resource } from '../../actions'
let images = null

export function searchKeyword(keyword) {
	if (keyword != undefined) {
		return {
	    	type: FILTER_KEYWORD, 
	    	keyword
	    }
	}
}

export const handleImageChange = (e) => {
	images = e.target.files[0]
}

export const updateArticle = (o) => {
	const payload = {text: o.text}
	return (dispatch) => {resource('PUT', `articles/${o.articleId}`, payload )
		.then(r => {
			dispatch({
				type: UPDATE_ARTICLES,
				article: r.articles[0]
			})
		})
	}
}

export const updateComments = (o) => {
	const payload = {text : o.text, commentId: o.commentId}
	return (dispatch) => {resource('PUT', `articles/${o.articleId}`, payload)
		.then(r => {
		
			dispatch({
				type: UPDATE_COMMENTS,
				article: r.articles[0]
			})
		})
	}
}

export const addArticle = (article) => {
	const fd = new FormData()
	fd.append('text', article.text)
	if (images != null) {
		fd.append('image', images)
	}
	return (dispatch) => {resource('POST', 'article', fd, false)
		.then(r => {
			dispatch({
				type: POST,
				article: r.articles[0]
			}) 
		})
	}
}

export const fetchArticle = () => {
	return (dispatch) => {
		resource('GET', 'articles').then((r) => {
    		dispatch({
        		type: FETCH_ARTICLES,
        		articles: r.articles
        })
	})}
}



