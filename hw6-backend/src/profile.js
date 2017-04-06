//For simiplicty I just add one user in here
const profile = [{
	username: 'hy23',
	email: 'hy23@rice.edu',
	zipcode: '77005',
	dob: '04-03-1994',
	headline: 'Become good developer',
	password: '123456',
	avatar: 'fake avatar'
}]
const username = 'hy23'

const getHeadlines = (req, res) => {
	const headlinesArr = []
	let item
	const users = req.params.users ? req.params.users.split(',') : [username]
	users.map((u) => {profile.map((val) => {
		if (val.username == u) {
			item = {username: u, headline: val.headline}
			headlinesArr.push(item)
		}
	})})
	if (item) {
		res.status(200).send({ headlines: headlinesArr})
	} else {
		res.sendStatus(401)
	}
	
}

const putHeadline = (req, res) => {
	let flag = 0
	profile.forEach((val, idx, arr) => {
		if (val.username == username) {
			flag = 1
			if (req.body && req.body.headline) {
				arr[idx].headline = req.body.headline
			}
			res.send({username: username, headline: req.body.headline})
		}
	})
	if (!flag) {
		res.sendStatus(401)
	}
}

const getEmail = (req, res) => {
	const emailArr = []
	let item
	const users = req.params.users ? req.params.users.split(',') : [username]
	users.map((u) => {profile.map((val) => {
		if (val.username == u) {
			item = {username: u, email: val.email}
			emailArr.push(item)
		}
	})})
	if (item) {
		res.status(200).send({ emails: emailArr})
	} else {
		res.sendStatus(401)
	}
}

const putEmail = (req, res) => {
	let flag = 0
	profile.forEach((val, idx, arr) => {
		if (val.username == username) {
			flag = 1
			if (req.body && req.body.email) {
				arr[idx].email = req.body.email
			}
			res.send({username: username, email: arr[idx].email})	
			return
		}
	})
	if (!flag) {
		res.sendStatus(401)
	}
  	
}

const getZipcode = (req, res) => {
	const zipArr = []
	let item
	const users = req.params.users ? req.params.users.split(',') : [username]
	users.map((u) => {profile.map((val) => {
		if (val.username == u) {
			item = {username: u, zipcode: val.zipcode}
			zipArr.push(item)
		}
	})})
	if (item) {
		res.status(200).send({ zipcodes: zipArr})
	} else {
		res.sendStatus(401)
	}
}

const putZipcode = (req, res) => {
	let flag = 0
	profile.forEach((val, idx, arr) => {
		if (val.username == username) {
			flag = 1
			if (req.body && req.body.zipcode) {
				arr[idx].zipcode = req.body.zipcode
			}
			res.send({username: username,zipcode: arr[idx].zipcode})
		}
	})
	if (!flag) {
		res.sendStatus(401)
	}
    
}

const getAvatars = (req, res) => {
	const avatarArr = []
	let item
	const users = req.params.user ? req.params.user.split(',') : [username]
	users.map((u) => {profile.map((val) => {
		if (val.username == u) {
			item = {username: u, avatar: val.avatar}
			avatarArr.push(item)
		}
	})})
	if (item) {
		res.status(200).send({ avatars: avatarArr})
	} else {
		res.sendStatus(401)
	}
}

const putAvatar = (req, res) => {
	let flag = 0
	profile.forEach((val, idx, arr) => {
		if (val.username == username) {
			flag = 1
			if (!req.headers) {
				arr[idx].avatar = req.body.get('image') 
			}
			res.send({username: username, avatar: arr[idx].avatar})
		}
	})
	if (!flag){
		res.sendStatus(401)
    }
}

const getDob = (req, res) => {
	const user = req.params.user
	let item
	profile.forEach((val, idx, arr) => {
		if (val.username == user) {
			item = {username: user, dob: val.dob}
		}
	})
	if (item) {
		res.send({item})
	}
}

module.exports = app => {
     app.get('/headlines/:users?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
     app.get('/dob', getDob)    
}
