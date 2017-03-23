import { FILTER_KEYWORD, POST, FETCH_ARTICLES, resource } from '../../actions'

export function searchKeyword(keyword) {

	if (keyword != undefined) {
		return {
	    	type: FILTER_KEYWORD, 
	    	keyword
	    }
	}
}
    
export const addArticle = (article, avatar) => {
	return (dispatch) => {resource('POST', 'article', article).then(r => {
		const _article = r.articles[0]
		_articles[0]['img'] = avatar
		dispatch({
			type: POST,
			article: _article
		}) 
	})
	}
}

export const fetchArticle = () => {
	
	return (dispatch) => {
		resource('GET', 'articles').then((r) => {
		const sortedArticles = r.articles.sort(function(a, b) {
            let x = new Date(a.date)
            let y = new Date(b.date)
            return ((x>y) ? -1 :((x<y)?1:0))
        });
        dispatch({
        	type: FETCH_ARTICLES,
        	sortedArticles
        })
	})}
}


