const expect = require('chai').expect
const fetch = require('isomorphic-fetch')


const url = path => `http://localhost:3000${path}`

describe('Test Headline Functions', () => {

 	it('GET headline, updates the headline message, GET headlines verify', (done) =>{
 		let oldHeadline
 		fetch(url("/headlines"),{method : "GET"})
 		.then(res => {
 			expect(res.status).to.eql(200)
 			return res.json()
 		})
 		.then(res => {
 			oldHeadline = res.headlines[0].headline
 		})

 		fetch(url("/headline"),{
 		 	method : "PUT",    
    		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({"headline":`random${Math.random()}`})
  		})
		.then(res => {
			expect(res.status).to.eql(200)
		})

		fetch(url("/headlines"),{method : "GET"})
 		.then(res => {
 			expect(res.status).to.eql(200)
 			return res.json()
 		})
 		.then(res => {
 			expect(oldHeadline).to.not.eql(res.headlines[0].headline) 
 		})
		.then(done)
		.catch(done)
 	},500)
})
