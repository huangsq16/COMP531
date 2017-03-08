
const express = require('express')
const bodyParser = require('body-parser')

let _articles = [
	{
		id： 0，
		author: 'owen',
		text: 'hello, this is owen'
	},
	{
		id： 1，
		author: 'bob',
		text: 'hello, this is bob'
	},
	{
		id： 2，
		author: 'cat',
		text: 'hello, this is cat'
	}
]

let newId = 3

const addArticle = (req, res) => {
     console.log('Payload received', req.body) 
     let newArticle = {id:newId, author:"test", text:"test"}
     _articles.push(newArticle)
     newId++;  
     res.send({articles: newArticle})   
}


const getArticle = (req, res) => {
	res.send({articles: _articles})
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

