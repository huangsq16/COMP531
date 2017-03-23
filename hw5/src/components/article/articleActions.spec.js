import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Article actions', () => {
    let articleAction, actions
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        actions = require('../../actions')
        articleAction = require('./articleActions') 
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  


    it('should fetch articles (mocked request)', (done)=>{
        const State = {articles : {avatars:{}}}

        mock(`${actions.apiUrl}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { "articles": [
                {
                    "id" : "0",
                    "text": "test1",
                    "date": "2015-09-05T06:25:36.770Z"
                },
                {
                    "id": "1",
                    "text": "test2",
                    "date": "2016-09-05T06:25:36.770Z"
                }
            ]}
        })

        articleAction.fetchArticle()(action => {
    		expect(action).to.eql({ 
                type : 'FETCH_ARTICLES',
                sortedArticles: [
                    {
                    "id": "1",
                    "text": "test2",
                    "date": "2016-09-05T06:25:36.770Z"
                    },
                    {
                    "id" : "0",
                    "text": "test1",
                    "date": "2015-09-05T06:25:36.770Z"
                    }
                ]
            })
            done()
        })
    })

    it('should update the search keyword', ()=>{
        const keyword = 'keyword'
        expect(articleAction.searchKeyword(keyword)).to.eql({type:'FILTER_KEYWORD',keyword})
    })

})