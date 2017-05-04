
const index = (req, res) => {
     res.send({result: 'success'})
}


module.exports = app => {
	app.get('/', index)
}