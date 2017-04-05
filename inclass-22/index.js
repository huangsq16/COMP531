const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const middleware = (req, res, callback) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    if (res.method == 'OPTIONS') {
    	res.sendStatus(200)
    }
    next()
}

app.use(cookieParser());
app.use(bodyParser.json())
app.use(middleware)

require('./src/articles.js')(app)
require('./src/profile.js')(app)
require('./src/auth.js')(app)
require('./src/following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})