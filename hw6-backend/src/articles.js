const username = 'hy23'
const articles = [ 
          { id:1, author: 'test1', text:'test' },
          { id:2, author: 'test2', text:'test' },
          { id:3, author: 'test3', text:'test' }
]


const fetchArticle = (req, res) => {
    const id = req.params.id
    if (id) {
        res.status(200).send({ articles : articles.filter( x => x._id == id || x.author == id)})
    }
    else {
        res.status(200).send({ articles : articles})
    }
}

const postArticle = (req, res) => {
	if (req.headers) {
		const item = {_id: articles.length+1, author: username, text:req.body.text, date: (new Date()).toJSON(), img: null, comments: []}
		articles.push(item)
    	res.status(200).send(item)
	} else {
		const item = {_id: articles.length+1, author: username, text:req.body.get('text'), date: (new Date()).toJSON(), img: req.body.get('image'), comments: []}
    	articles.push(item)
    	res.status(200).send(item)
	}
    
}

const putArticle = (req, res) => {
	articles.forEach((val, idx, arr) => {	
		if (req.body.commentId != undefined) {
			if (req.body.commentId != -1) {
				arr[idx].comments.forEach((_val, _idx, _arr) => {
					if (req.body.commentId == _val._id) {
						_arr[_idx].text = req.body.text
					}
				})
			} else {
				const _comment = arr[idx].comments
				item = {_id: _comment.length + 1, text: req.body.text, date: (new Date()).toJSON(), author: username}
				_comment.push(item)
			}
		} else {
			if (val._id == req.params.id) {
				arr[idx].text = req.body.text
			}
		}
	})
	res.send({articles : articles})
}

module.exports = app => {
    app.get('/articles/:id*?', fetchArticle)
    app.post('/article', postArticle)
    app.put('/articles/id', putArticle)
}