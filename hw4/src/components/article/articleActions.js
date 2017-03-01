import { FILTER_KEYWORD, POST } from '../../actions'

export function searchKeyword(keyword) {
	if (keyword != "") {
		return {
	    	type: FILTER_KEYWORD, 
	    	keyword 
	    }
	}
}
    
export const addArticle = (article) => {
	return {
		type: POST,
		text: article.text,
		date: article.date,
		img: article.img,
		comments: article.comments,
		author: article.author
	}
}


