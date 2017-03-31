const md5 = require('md5')
const cookieKey = 'sid';
const user = [];

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
			
module.exports = app => {
    app.post('/register', register);
    app.post('/login', login);	
}