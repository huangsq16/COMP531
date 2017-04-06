const username = 'hy23'
const followers = [{}]

const fetchFollowers = (req, res) => {
    const user = req.params.user
    if (user) {
        res.send(JSON.stringify({ username : user, following: followers.filter( x => x.username == user)}))
    }
    else {
        res.send(JSON.stringify({ username : username, following: followers.filter( x => x.username == username).following }))
    }
}

const putFollowers = (req, res) => {
	const user = req.params.user
	if (!user) {
		res.sendStatus(401)
	} else {
		followers.forEach((val, idx, arr) => {
			if (username == val.username) {
				arr[idx].following.push(user)
				res.send(JSON.stringify({ username : username, following: arr[idx] }))
			}
		})
	}
	
}

const deleteFollower = (req, res) => {
	const user = req.params.user
	if (!user) {
		res.sendStatus(401)
	} else {
		followers.forEach((val, idx, arr) => {
			if (username == val.username) {
				arr[idx].following = val.following.filter(x => x.username != user)
				res.send(JSON.stringify({ username : username, following: arr[idx] }))
			}
		})
	}
	
}

module.exports = app => {
    app.get('/following/:user?', fetchFollowers)
    app.put('/following/:user', putFollowers)
    app.delete('/following/:user', deleteFollower)
}