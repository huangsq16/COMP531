const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const isLoggedIn = require('./auth.js').isLoggedIn
const md5 = require('md5')
/*
	The function returns articles by the requested id, if no requested id, it will send all articles
*/
const fetchArticle = (req, res) => {
	if(req.params.id){
		Article.find({ $or: [ { _id: req.params.id }, { author: req.params.id }]} ).exec((err, articles) => {
			if(articles === undefined){
				res.status(200).send({articles:[]})
				return
			} else {
				res.status(200).send({articles:articles})
			}
		})
	} else {
		Article.find({}).exec((err, articles) => {
			if(err) {
				return console.log(err)
			} else {
				res.status(200).send({articles:articles})
			}
		})
	}
}

/*
	The function adds new article into database and return the new article to frontend
*/
const postArticle = (req, res) => {
	console.log(req)
	if(!req.body.text){
		res.status(400).send("missing text input")
		return
	}
	let newArticle
	if (req.headers) {
		newArticle = new Article({
			author:req.username, 
			text:req.body.text,
			date:(new Date()).toJSON(),
			img:'http://lorempixel.com/396/230/',
			comments:[]
		})
	} 
	new Article(newArticle).save((err,article) => {
		if(err) {
			return console.log(err)
		} else {
			res.status(200).send({articles:[article]})
		}
	})
}

/*
	The function update the requested article and return the requested article to frontend
*/
const putArticle = (req, res) => {
	
	if(!req.body.text){
        res.status(401).send("missing text input")
        return
    }
	
	Article.find({_id:req.params.id}).exec((err, articles) => {
		console.log('fuck')
		console.log(req.body.commentId)
		if(articles === undefined || articles.length === 0){
    		res.status(401).send("invalid post id")
    		return
    	} else {
    		const article = articles[0]
		    if(!req.body.commentId){
		    	if(article.author == req.username){
					Article.findOneAndUpdate({_id: req.params.id}, { $set: { text: req.body.text }}, {new: true}, (err, result) => {
						if(err) {
							return console.log(err)
						} else {
							console.log(result)
							res.status(200).send({articles:[result]})
						}
					})
		    	} else {
		    		res.status(401).send('Invalid request')
		    		return
		    	}
		    } else {
		    	if(req.body.commentId === "-1"){
		    		const newComment = {author:req.username, date:(new Date()).toJSON(), text:req.body.text}
		    		const comments = article.comments
		    		comments.push(newComment)
		    		Article.findOneAndUpdate({_id:req.params.id},{$set: {comments:comments}}, {new: true}, (err, result) => {
						console.log(result)
							res.status(200).send({articles:[result]})
		    		})
		    	} else{
					let flag = false
					console.log('inhere')
					console.log(req.body.commentId)
					article.comments.forEach((_val, _idx, _arr) => {
						console.log(_val)
						if (req.body.commentId == _val._id) {
							flag = true
							if (_val.author == req.username) {
								_arr[_idx].text = req.body.text
							}
						}
					})
					if (!flag) {
						res.status(400).send('Wrong commentId or username is not same')
		    			return
					} else {
						//Article.findOneAndUpdate({_id:req.params.id},{$set: { comments:newcomments}}, {new: true}, (err, result) => {
							res.status(200).send({articles:[article]})
						//})
		    		}
		    	}
		    }
    	}
    })
}

module.exports = app => {
    app.get('/articles/:id*?', isLoggedIn, fetchArticle)
    app.post('/article', isLoggedIn, postArticle)
    app.put('/articles/:id', isLoggedIn, putArticle)
}