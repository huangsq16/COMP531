const article = { articles: [ 
          { id:1, author: 'test1', text:'test' },
          { id:2, author: 'test2', text:'test' },
          { id:3, author: 'test3', text:'test' }
]};

const addArticle = (req, res) => {
     const newArticle = {
     	  id: articles.articles.length+1
          author: req.body.author,
          text: req.body.text,
     }  
     article.articles.push(newArticle)
     res.send({articles:[newArticle]})
}

const getArticle= (req,res)=>{
     const id = req.params.id
     if (!id) {
          res.send(articles)
     } else {
          res.send({articles: article.articles.filter(a => {a.id==id})})
     }
}

module.exports = (app) => {
     app.post('/article', addArticle)
     app.get('/articles/:id*?', getArticle)
}