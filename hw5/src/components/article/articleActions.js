import { FILTER_KEYWORD, POST, FETCH_ARTICLES } from '../../actions'

export function searchKeyword(keyword) {
	if (keyword != "") {
		return {
	    	type: FILTER_KEYWORD, 
	    	keyword 
	    }
	}
}
    
export const addArticle = (article) => {
	return resource('POST', 'articles', article.text).then(r => {
		const _article = r.articles[0]
		return {
			type: POST,
			_article
		}
	})
}

export const fetchArticle = () => {
	return resource('GET', 'articles').then((r) => {
		const sortedArticles = articles.sort(function(a, b) {
            let x = new Date(a.date)
            let y = new Date(b.date)
            return ((x>y) ? -1 :((x<y)?1:0))
        });
        return {
        	type: FETCH_ARTICLES,
        	sortedArticles
        }
	})
}


