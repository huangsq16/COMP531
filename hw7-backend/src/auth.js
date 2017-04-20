const User = require('./model.js').User
const Profile = require('./model.js').Profile
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const request = require('request')
const redis = require('redis').createClient('redis://h:pd77265303af8d840517b40111979c58dd71f98994ac3bbb83e878e1f1e79231b@ec2-34-206-56-122.compute-1.amazonaws.com:39849')
const cookieKey = 'sid'

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
	const _dob = req.body.birth.split('/')
	const dob = new Date(_dob[2], _dob[0]-1, _dob[1]).toJSON()
	const zipcode = req.body.zip
	const headline = ""
	const email = req.body.email
	
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
						following:[], dob:dob, headline:headline, zipcode:zipcode,
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
	handle login, if success will send cookie
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
	check cookie to make sure its the correct user and if cookie is wrong, return err
*/
const isLoggedIn = (req, res, next) => {
	const sid = req.cookies[cookieKey]
	if (!sid){
        return res.sendStatus(401)
    }
    redis.hgetall(sid, function(err, userObj) {
    	if(err) throw err;
    	if(userObj){
    		console.log(sid + 'mapped to ' + userObj.username)
    		req.username = userObj.username
			next()
		} else {
			res.sendStatus(401)
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
		res.status(400).send('missing password')
		return
	} else {
		User.find({username:username}).exec((err,user) => {
			if(err) {
				return console.log(err)
			} else {
				if(md5(user[0].salt+password) === user[0].hash){
					res.status(400).send("new password is the same as old password")
					return
				} else { 
					const newsalt = createSalt()
					const newhash = md5(password + newsalt );
					User.update({username: username}, { $set: { salt: newsalt, hash: newhash }}, (err, user) => {
		        		res.sendStatus(200)
		    		})
				}	
			}
		})
	}
}

/*
	handle logout and delete cookie
*/
const logout = (req,res) => {
	redis.del(req.cookies[cookieKey])
	res.clearCookie(cookieKey)
	res.status(200).send("OK")	
}

exports = (app) => {
    app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', isLoggedIn, logout)
	app.put('/password', isLoggedIn, putPassword)
}
exports.isLoggedIn = isLoggedIn
module.exports = exports




