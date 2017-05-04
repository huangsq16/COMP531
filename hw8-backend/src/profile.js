const Profile = require('./model.js').Profile
const isLoggedIn = require('./auth.js').isLoggedIn
const uploadImage = require('./uploadCloudinary.js')

/*
	The function returns headlines by the requested user
*/
const getHeadlines = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : [req.username]
	
	Profile.find({username: {$in:users}}).exec((err,profiles) => {
        if(!profiles || profiles.length === 0 ){
            res.status(400).send('No headlines found')
            return
        }
        const result = []
        profiles.forEach((item, idx, arr) =>{
            result.push({username:item.username, headline:item.headline})
        })
        res.status(200).send({headlines:result})
    })
}

/*
	The function put headline to the user
*/
const putHeadline = (req, res) => {
	const user = req.username
    if(!req.body.headline){
        res.status(400).send({errMsg:"missing the headline input"})
        return
    }
    Profile.update({username:user},{$set:{headline:req.body.headline}}, (err, tank) => {
        if(err) {
            return console.log(err)
		} else {
            Profile.find({username:user}).exec((err,profiles) => {
                if(err) {
                    return console.log(err)
				} else if(!profiles || profiles.length === 0){
                    res.status(400).send({errMsg:"no profile found"})
                    return
                } else {
                    res.status(200).send({
						username:user,
						headline:profiles[0].headline
                    })
                }
            })
        }
    })
}

/*
	The function returns email by requested user
*/

const getEmail = (req, res) => {
	const user = req.params.user ? req.params.user : req.username
	Profile.find({username:user}).exec((err, profiles) => {
		if (!profiles || profiles.length == 0) {
			res.status(400).send("no email found!")
			return
		} else {
			res.status(200).send({username: user, email: profiles[0].email})
		}
	})
}

/*
	The function puts email to user
*/
const putEmail = (req, res) => {
	const user = req.username
	if (!req.body.email) {
		res.status(401).send("no email")
	} else {
		Profile.update({username:user},{$set:{email:req.body.email}}, (err, tank) => {
			if(err){
				return console.log(err)
			} else {
				Profile.find({username:user}).exec((err,profiles) => {
					if(err) {
						return console.log(err)
					} else if (!profiles || profiles.length === 0){
						res.status(400).send("no email found")
						return
					} else {
						res.status(200).send({username:user,email:profiles[0].email})
					}
				})
			}
		})
	}
}

/*
	The function returns zipcode to user by requested user name
*/

const getZipcode = (req, res) => {
	const user = req.params.user ? req.params.user : [req.username]
	Profile.find({username: user}).exec((err, profiles) => {
		if (!profiles || profiles.length == 0) {
			res.status(401).send("no zipcode found!")
			return
		} else {
			res.status(200).send({username: user, zipcode: profiles[0].zipcode})
		}
	})
}

/*
	The function puts zipcode to user 
*/

const putZipcode = (req, res) => {
	const user = req.username
	if (!req.body.zipcode) {
		res.status(401).send("no zipcode")
	} else {
		Profile.update({username:user},{$set:{zipcode:req.body.zipcode}}, (err, tank) => {
			if(err){
				return console.log(err)
			} else {
				Profile.find({username:user}).exec((err,profiles) => {
					if(err) {
						return console.log(err)
					} else if (!profiles || profiles.length === 0){
						res.status(400).send("no zipcode found")
						return
					} else {
						res.status(200).send({username:user,zipcode:profiles[0].zipcode})
					}
				})
			}
		})
	}
}

/*
	The function returns Avatar to user
*/

const getAvatars = (req, res) => {
	const users = req.params.user ? req.params.user.split(',') : [req.username]
	Profile.find({username: {$in:users}}).exec((err,profiles) => {
        if(!profiles || profiles.length === 0 ){
            res.status(401).send('No avatar found')
            return
        }
        const result = []
        profiles.forEach((item, idx, arr) =>{
            result.push({username:item.username, avatar:item.avatar})
        })
        res.status(200).send({avatars:result})
    })
}

/*
	In building stage, the function puts avatar to user
*/
const putAvatar = (req, res) => {
	const user = req.username
    if(!req.fileurl){
        res.status(401).send("missing the headline input")
        return
    }
    Profile.update({username:user},{$set:{avatar:req.fileurl}}, (err, tank) => {
        if(err) {
            return console.log(err)
		} else {
            Profile.find({username:user}).exec((err,profiles) => {
                if(err) {
                    return console.log(err)
				} else if(!profiles || profiles.length === 0){
                    res.status(400).send("no profile found")
                    return
                } else {
                    res.status(200).send({username:user, avatar:profiles[0].avatar})
                }
            })
        }
    })
}

/*
	The function returns birth date to user
*/
const getDob = (req, res) => {
	const user = req.params.user ? req.params.user : [req.username]
	Profile.find({username: user}).exec((err, profiles) => {
		if (!profiles || profiles.length == 0) {
			res.status(401).send("no dob found!")
			return
		} else {
			res.status(200).send({username: user, dob: profiles[0].dob})
		}
	})
}

module.exports = app => {
     app.get('/headlines/:users?', isLoggedIn, getHeadlines)
     app.put('/headline', isLoggedIn, putHeadline)
     app.get('/email/:user?', isLoggedIn, getEmail)
     app.put('/email', isLoggedIn, putEmail)
     app.get('/zipcode/:user?', isLoggedIn, getZipcode)
     app.put('/zipcode', isLoggedIn, putZipcode)
     app.get('/avatars/:user?', isLoggedIn, getAvatars)
     app.put('/avatar',  isLoggedIn, uploadImage('avatar'), putAvatar)
     app.get('/dob', isLoggedIn, getDob)    
}
