/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url('/articles'))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(res => {
                expect(res.articles.length).to.have.above(2)
            }).then(done).catch(done)
		
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		const newArticle1 = {author:'test1',text: 'test'}
        const newArticle2 = {author:'test2',text: 'test'}
        let id = 0
        fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newArticle1)
        })
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then((res) => {
            expect(res.articles).to.have.ownProperty('id')
            expect(res.articles.text).to.eql(newArticle1.text)
            expect(res.articles.author).to.eql(newArticle1.author)
            id = res.articles.id
        }).then(done).catch(done)
       
        fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newArticle2)
        })
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(res => {
            expect(res.articles).to.have.ownProperty('id')
            expect(res.articles.text).to.eql(newArticle2.text)
            expect(res.articles.author).to.eql(newArticle2.author)
            expect(res.articles.id).to.eql(id + 1)
        }).then(done).catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		let id = 0;
		fetch(url('/articles'))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(res => {
                expect(res.articles.length).to.have.above(2)
                id = res.articles[1].id
            })
        const path = `'/articles/${id}'`
		fetch(url(path))
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(res => {
            expect(res.articles.id).to.eql(id)
        }).then(done).catch(done)
		
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url('/articles/0'))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(res => {
                expect(res.articles.length).to.eql(0)
            }).then(done).catch(done)
		
	}, 200)

});
