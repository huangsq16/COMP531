/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

    it('post-article', (done) => {
        let count;
        const getart = fetch(url("/articles"),{method : "GET"})
        .then(res => {
            expect(res.status).to.eql(200)  
            return res.json()
        })
        .then(res=> {
            count = res.articles.length;
        })
        
       
        const postart = fetch(url("/article"),{
            method : "POST",
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({"text": "new article"})
        })
        .then(res => {
            expect(res.status).to.eql(200)  
            return res.json()
        })
       .then(body => {
            const test = 'new article'
            expect(body.text).to.equal(test)
        })
       
       
        const getart1 = fetch(url("/articles"),{method : "GET"})
        .then(res => {
            expect(res.status).to.eql(200)  
            return res.json()
        })
        .then(res=> {
            expect(count).to.equal(res.articles.length - 1);
        })
        .then(done).catch(done)
    
    }, 500)

});
