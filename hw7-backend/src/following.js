const User = require('./model.js').User
const Profile = require('./model.js').Profile
const isLoggedIn = require('./auth.js').isLoggedIn
/*
	The function returns the follower by the requested name
*/
const fetchFollowers = (req, res) => {
    const user = req.params.user ? req.params.user : req.username
    Profile.find({username:user}).exec((err,profiles) => {
        if(err) {
            return console.log(err)
		} else {
            if(!profiles || profiles.length === 0){
                res.status(400).send({errMsg: "this user has not registered"})
                return
            } else {
                res.status(200).send({
                    username:user,
                    following:profiles[0].following
                })
            }
        }
    })
}

/*
	The function put new follower into corresponding user file, if it already existed, it will do nothing and return the following directly
*/
const putFollowers = (req, res) => {
	const user = req.params.user
	if (!user) {
		res.sendStatus(401).send('no user')
		return
	} else {
		User.find({username:user}).exec((err, users) => {
            if(err){
     			console.log(err)
				return 
            } else if (!users || users.length === 0){
                res.status(401).send('no user found')
                return
            } else {
                Profile.findOneAndUpdate({username:req.username}, {$addToSet:{following:user}}, {new:true}, (err, result) => {
					if(err) {
						console.log(err)
						return
					} else {
						res.status(200).send({ username:req.username, following: result.following})
					}
				})
            }
        })
	}
}

/*
	The function delete follower by the requested user, then return the result to user
*/
const deleteFollower = (req, res) => {
	const user = req.username
    const follower = req.params.user
    if(!follower){
        res.status(400).send("missing the following user")
        return
    }
    Profile.findOneAndUpdate({username:user}, {$pull:{following:follower}}, {new: true}, (err, result) => {
		if (err) {
			console.log(err)
			return
		} else {
			res.status(200).send({username:user,following:result.following})
		}
    })
}

module.exports = app => {
    app.get('/following/:user?', isLoggedIn, fetchFollowers)
    app.put('/following/:user', isLoggedIn, putFollowers)
    app.delete('/following/:user', isLoggedIn, deleteFollower)
}