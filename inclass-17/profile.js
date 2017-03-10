//For simiplicty I just add one user in here

const getHeadline = (req, res) => {
	res.send({ 
		headlines: [{
			username:'hy', 
			headline:'hy'
		}] 
	})
}

const putHeadline = (req, res) => {
	res.send({ 
		headlines: [{
		username:'hy',
		headline: req.body.headline || 'missing file'
		}]
	})
}

const getEmail  = (req, res) => {
	res.send({
		username:'hy',
		email: 'a@b.c'
	})
}

const putEmail = (req, res) => {
	res.send({
		username:'hy',
		email: req.body.email || 'missing file'
	})
}

const getZipcode = (req, res) => {
	res.send({
		username:'hy',
		zipcode: '77005'
	})
}

const putZipcode = (req, res) => {
	res.send({
		username:'hy',
		zipcode: req.body.zipcode || 'missing file'
	})
}

const getAvatar = (req, res) => {
	res.send({ avatars: [{
		username:'hy',
		avatar: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjCjoHzmsvSAhVq74MKHfbIDfQQjRwIBw&url=http%3A%2F%2Fwww.shunvmall.com%2Ffree-images.html&psig=AFQjCNGsBbs-0dRDoHerow8nojeFRCDQrQ&ust=1489210320016396'
	}]})
}

const putAvatar = (req, res) => {
	res.send({
		username:'hy',
		avatar: req.body.avatar || 'missing file'
	})
}

const index = (req, res) => {
	console.log(req.params.user)
    res.send({ hello: 'world' })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:users?', getAvatar)
     app.put('/avatar', putAvatar)
}


