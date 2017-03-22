import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * from './articleActions'


describe('Validate Article actions', () => {

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  


    it('should fetch articles (mocked request)', (done)=>{
        const State = {articles : {avatars:{}}}

        mock(`${url}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { articles: [
                {
                    id : 0,
                    text: "test",
                    date: "2015-09-05T06:25:36.770Z",
                    img: "http://lorempixel.com/340/241/",
                    comments: [],
                    author: "test"
                },
                {
                    id: 1,
                    text: "test",
                    date: "2016-09-05T06:25:36.770Z",
                    img: "http://lorempixel.com/340/241/",
                    comments: [],
                    author: "test"
                }
            ]}
        })

        const action = fetchArticles()
        expect(action).to.satisfy((action) => {
            return action.type=='FETCH_ARTICLES' && action.sortedArticles[0].id == 1
        })

    })

    it('should update the search keyword', ()=>{
        const keyword = 'keyword'
        expect(searchKeyword(keyword)).to.eql({type:'FILTER_KEYWORD',keyword})
        
    })



})