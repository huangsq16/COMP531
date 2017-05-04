const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const isLoggedIn = require('./auth.js').isLoggedIn
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const md5 = require('md5')
const uploadImage = require('./uploadCloudinary.js')
const ObjectId = require('mongoose').Types.ObjectId
/*
	The function only fetch articles from user and its followers.
*/

const addUsersToQuery = (req, res) => {
	const usersToQuery = []
	usersToQuery.push(req.username)
	Profile.find({username:req.username}).exec((err,profiles) => {
		if(err) {
		} else {
			if(!profiles || profiles.length === 0){ 
			} else {
				usersToQuery.push(...profiles[0].following)
				getArticlesByAuthors(req, res, 0, {authors: usersToQuery, limit: 10})
			}
		}
	})
}

const getArticlesByAuthors = (req, res, page, {authors, limit}) => {
	Article.find({ author : { $in : authors} } ).sort({'date': -1}).limit(limit).skip(limit*page).exec((err, articles) => {
			if(articles === undefined){
				res.status(200).send({articles:[]})
				return
			} else {
				res.status(200).send({articles:articles})
			}
		})
}

/*
	The function returns articles by the requested id, if no requested id, it will send all articles
*/
const fetchArticle = (req, res) => {
	if(req.params.id){
		const id = new ObjectId( (req.params.id.length < 12) ? "123456789012" : req.params.id )
		Article.find({ $or: [ { _id: id }, { author: req.params.id }]} ).exec((err, articles) => {
			if(articles === undefined){
				res.status(200).send({articles:[]})
				return
			} else {
				res.status(200).send({articles:articles})
			}
		})
	} else {
		addUsersToQuery(req, res)
		
	}
}

/*
	The function adds new article into database and return the new article to frontend
*/
const postArticle = (req, res) => {
	if(!req.body.text){
		res.status(400).send("missing text input")
		return
	}
	let newArticle
	const url = req.fileurl? req.fileurl:''
	if (req.headers) {
		newArticle = new Article({
			author:req.username, 
			text:req.body.text,
			date:(new Date()).toJSON(),
			img: url,
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
        res.status(400).send("missing text input")
        return
    }
	
	Article.find({_id:req.params.id}).exec((err, articles) => {
		if(articles === undefined || articles.length === 0){
    		res.status(400).send("invalid post id")
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
		    		res.status(400).send('Invalid request')
		    		return
		    	}
		    } else {
		    	if(req.body.commentId === "-1"){
		    		const newComment = {author:req.username, date:(new Date()).toJSON(), text:req.body.text}
		    		const comments = article.comments
		    		comments.push(newComment)
		    		Article.findOneAndUpdate({_id:req.params.id},{$set: {comments:comments}}, {new: true}, (err, result) => {
							res.status(200).send({articles:[result]})
		    		})
		    	} else{
					let flag = false
					article.comments.forEach((_val, _idx, _arr) => {
						if (req.body.commentId == _val._id) {
							flag = true
							if (_val.author == req.username) {
								_arr[_idx].text = req.body.text
							}
						}
					})
					Article.update({_id:req.params.id}, {$set: {comments: article.comments}}, {new:true}, (err, result) => {
						if (!flag) {
							res.status(400).send('Wrong commentId or username is not same')
							return
						} else {
							res.status(200).send({articles:[article]})
						}
					})
					
		    	}
		    }
    	}
    })
}

module.exports = app => {
    app.get('/articles/:id*?', isLoggedIn, fetchArticle)
    app.post('/article', isLoggedIn, uploadImage('img'), postArticle)
    app.put('/articles/:id', isLoggedIn, putArticle)
}