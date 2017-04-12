var redis = require('redis').createClient("redis://h:p9523bdb7db8f47b158ce877ae2ea9e46f7ae25c8f30e644ccb78b7f483dc00ee@ec2-34-206-56-140.compute-1.amazonaws.com:11889");
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
let users = [];
const cookieKey = 'sid'
const User = new Array();
let loginUser = ''
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientID:'248988052239109', 
	clientSecret:'99a192fcff858c90d69a7960a2daf991', 
	callbackURL
}

const register =(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.sendStatus(400)
		return
	}
    const salt =  Math.random().toString(36)
    user.push({"username" : req.body.username, "salt":salt, "hash" : md5(req.body.password+salt)})
    res.send("success");
}

const login =(req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.sendStatus(400)
		return
	}

	const response =  user.find(u => {
		if(u.username === username && u.hash === md5(password + u.salt)) {
			return u;	
		}
	});

	if(response) { 
		res.cookie(cookieKey, response.hash, {maxAge:3600*1000, httpOnly : true});
		res.send({username : username, result : "success"}); 
	} else { 
		res.sendStatus(401);
	}
}

//use Facebook Strategy to login
passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = users[id]
	done(null,user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))

function logout(req,res){
	req.logout();
	req.redirect('/')
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		next()
	} else {
		res.redirect('/login')
	}
}

function profile(req,res){
	res.send({'ok now what?':req.user})
}

module.exports = app => {
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', logout)
	app.use(session({secret: `this is a Math.random()`}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/test/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
	}