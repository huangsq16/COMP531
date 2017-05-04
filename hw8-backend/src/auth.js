const User = require('./model.js').User
const Profile = require('./model.js').Profile
const md5 = require('md5')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser')
const request = require('request')
const redis = require('redis').createClient('redis://h:pd77265303af8d840517b40111979c58dd71f98994ac3bbb83e878e1f1e79231b@ec2-34-206-56-122.compute-1.amazonaws.com:39849')
const cookieKey = 'sid'
const config = {
	clientID:'248988052239109', 
	clientSecret:'99a192fcff858c90d69a7960a2daf991', 
	profileFields: ['id', 'email', 'displayName'],
	callbackURL : 'https://backend-hw7-hy23.herokuapp.com/auth/callback'
    
}
/*
	create salt for using
*/
const createSalt = () => {
	const salt = 'kxe1410%^&03'
	return md5(salt + new Date().getTime()) ;
}

/*
	handle register and if user existed will return error
*/
const register =(req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const dob = req.body.dob
	const zipcode = req.body.zipcode
	const headline = ""
	const email = req.body.email
	let following = []
	if (req.body.following != null) {
		following.push(...req.body.following)
	}
	if (!username || !password || !dob || !zipcode || !password || !email) {
		res.status(400).send("all fields should be filled in")
		return
	} else {
		User.find({username:username}).exec((err, users) => {
			if(err) {
				return console.log(err)
			} else {
				if(users.length !== 0){
					res.status(400).send("this username has already been used")
					return
				} else {
					const salt = createSalt();
					const hash = md5(password+salt)
					const obj_user = new User({username:username, salt:salt, hash:hash})
					new User(obj_user).save((err, user) => {
						if(err) {
							return console.log(err)
						}
					})
					const obj_profile = new Profile({username:username, email:email, 
						following:following, dob:dob, headline:headline, zipcode:zipcode,
						avatar:'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
						})
					
					new Profile(obj_profile).save((err, user) => {
						if(err) {
							return console.log(err)
						} else {
							res.status(200).send({result:'success', username:username})
						}
					})
				}
			}
		})
	}
}

/*
	handle login, if success will send cookie to frontend
*/
const login =(req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	User.find({username: username}).exec(function(err, users){
		if(err) {
			return console.log(err)
		} else {
			if (!users  || users.length === 0){
				res.status(401).send("this username hasn't been registered")
				return
			}
			obj_user = users[0]
			if(!obj_user){
				res.status(401).send("Don't have this user")
				return
			}
			const sid = md5(new Date().getTime() + obj_user.username)
			if(md5(password+obj_user.salt) == obj_user.hash){
				redis.hmset(sid, obj_user)
				res.cookie(cookieKey, sid,{maxAge: 3600*1000, httpOnly: true})
				res.status(200).send({username:username, result: 'success'})
			} else {
				res.status(401).send("incorrect password")
			}
		}
	})
}
	

/*
	handle change password work and create new salt to user
*/

const putPassword = (req,res) => {
	const password = req.body.password
	const username = req.username
	if (!password){
		res.sendStatus(200)
		return
	} else {
		User.find({username:username}).exec((err,user) => {
			if(err) {
				return console.log(err)
			} else {
				const newsalt = createSalt()
				const newhash = md5(password + newsalt );
				User.update({username: username}, { $set: { salt: newsalt, hash: newhash }}, (err, user) => {
					res.sendStatus(200)
				})
			}
		})
	}
}


/*
	check cookie to make sure its the correct user and if cookie is wrong, return err
*/
const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		req.username = req.user.displayName + '|' + req.user.provider
		next()
	} else {
		const sid = req.cookies[cookieKey]
		if (!sid){
			return res.sendStatus(401)
		}
		redis.hgetall(sid, function(err, userObj) {
			if(err) throw err;
			if(userObj){
				req.username = userObj.username
				next()
			} else {
				res.sendStatus(401)
			}
		})
	}
}



/*
The third part authentication part, for elegent, I add a default headline and avatar
*/
let users = []
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
			const info = profile._json
			const username = profile.displayName + '|' + profile.provider
			User.find({username: username}).exec(function(err, users){
				if(err) {
					return console.log(err)
				} else {
					if (users.length == 0) {
						new User({username:username, salt:null, hash: null}).save()
						new Profile({username:username, email: info.email, zipcode: null, dob: null, 
							headline: "Facebook auth",
							avatar:'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
							following: []}).save()
					}
				}
			})
			return done(null,profile);
		})
	}
))

/*
	This function try to link regular accound with facebook account and pass the following of facebook account to regular account
*/
const linkRegular = (req, res) => {
	const username = req.body.username
	const provider = req.body.provider
	User.find({username: username}).exec(function(err, users){
		if(err) {
			return console.log(err)
		} else {
			if (users.length != 0) {
				let flag = 0
				if (users[0].Oauth.length != 0) {
					users[0].Oauth.forEach((val, idx, arr) => {
						if (val === provider) {
							flag = 1
						}
					})
				}
				if (flag == 1) {
					res.status(200).send({result: 'duplicate'})
					return
				} else {
					const fbuser = username + "|" + provider
					User.update({username: username}, {$addToSet: {'Oauth': provider}}, function(err, usr){
						Profile.find({username: username}).exec((err, reguser) => {
							Profile.find({username: fbuser}).exec((err, fbuser) => {
								const regfollowing = []
								if (reguser[0].following != null) {
									regfollowing.push(...reguser[0].following)
								}
								if (fbuser && fbuser[0].following && fbuser[0].following.length != 0) {
									fbuser[0].following.map(val => {
										if (regfollowing.indexOf(val) < 0) {
											regfollowing.push(val)
						 				}
									})
								}
								Profile.update({username: username}, {$set: {'following': regfollowing}}, function(err, user){
									res.status(200).send({result: 'success'})
								})
							})
						})
					})
				}
			} else {
				res.status(200).send({result: 'no regular user in db'})
				return
			}
		}
	})
}

/*
	unlink the regular account and facebook account, set oauth[facebook] to null
*/

const unlink = (req, res) => {
	const username = req.body.username
	console.log(username)
	const provider = req.body.provider
	User.find({username: username}).exec(function(err, users){
		const oauth = users[0].Oauth
		oauth.forEach((val, idx, arr) => {
			if (val === provider) {
				console.log(arr[idx])
				arr[idx] = ""
			}
		})
		console.log(oauth)
		User.update({username: username}, {$set: {Oauth: oauth}}, {new: true}, function(err, usr){
			res.status(200).send({result: "success"})
		})
	})
}


/*
	handle logout and delete cookie
*/
const logout = (req,res) => {
	if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		res.status(200).send("OK")
	} else {
		redis.del(req.cookies[cookieKey])
		res.clearCookie(cookieKey)
		res.status(200).send("OK")	
	}
}

/* 
	return 401 if failed on authentication
*/
const fail = (req, res) => {
	res.sendStatus(401)
}

/*
	Different from isLoggedIn, this function handle the request from frontend and send correct username to it
*/
const Logged = (req, res) => {
	if(req.isAuthenticated()){
		res.status(200).send({username:req.user.displayName, result: 'auth', provider: req.user.provider})
	}  else {
		const sid = req.cookies[cookieKey]
		if (!sid){
			return res.status(200).send({result:'fail'})
		}
		redis.hgetall(sid, function(err, userObj) {
			if(err) throw err;
			if(userObj){
				return res.status(200).send({username:userObj.username, result: 'reg'})
			} else {
				return res.status(200).send({result:'fail'})
			}
		})
	}
}

exports = (app) => {
	app.use(cookieParser())
	app.use(session({secret:'asdfasd4e56si6drfnd56sftysd5dx', resave: false, saveUninitialized: false}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.get('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.get('/auth/callback', passport.authenticate('facebook', {successRedirect:'http://ricebook-final-hy23.surge.sh', failureRedirect:'/fail'}))
    app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', isLoggedIn, logout)
	app.put('/password', isLoggedIn, putPassword)
	app.get('/log', Logged)
	app.get('/fail', fail)
	app.post('/link', linkRegular)
	app.post('/unlink', unlink)
}
exports.isLoggedIn = isLoggedIn
module.exports = exports




