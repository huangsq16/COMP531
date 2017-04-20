const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const enableCORS = (req,res,next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    next()
}

app.use(cookieParser())
app.use(bodyParser.json())
app.use(enableCORS)
require('./src/profile.js')(app)
require('./src/articles.js')(app)
require('./src/auth.js')(app)
require('./src/following.js')(app)
require('./src/hello.js')(app)

if (process.env.NODE_ENV !== "production") {
    require('dotenv').load()
}

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

