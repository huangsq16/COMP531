import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Reducer from './reducers'
import {articles} from './reducers'
import {filter} from './components/article/articlesView'

const articlesItems = require('./data/article.json');
const followersItems = require('./data/followers.json');
const profile = require('./data/profile.json');

const initialState = {
    location : "signIn",
    errorReg : "",
    successMsg: "",
    profile: 1,
    nextId: 10,
    nextFollowerId: 3,
    keyword: "",
    followers: followersItems.followers,
    article : articlesItems.articles,
    filteredArticles: articlesItems.articles,
    userinfo: profile.userinfo
}

const newArticle = {
    text: "test",
    date: "2015-09-05T06:25:36.770Z",
    img: "http://lorempixel.com/340/241/",
    comments: [],
    author: "test"
}

const newKeyword = 'hy23'
    
describe('Validate reducer (no fetch requests here)', ()=> {
    it('should return the initial state', ()=>{
        expect(Reducer(undefined, {})).to.eql(initialState)
    })

    it('should state success (for displaying success message to user)', ()=>{
        const successMsg = 'success'
        expect(Reducer(undefined, {type:'SUCCESS', successMsg}))
        .to.eql({...initialState, successMsg: action.successMsg})
    })

    it('should state error (for displaying error message to user)', ()=>{
        const errorMsg = 'error'
        expect(Reducer(undefined, {type:'ERROR', errorMsg}))
        .to.eql({...initialState, errorReg: action.errorMsg})
    })


    it('should set the articles',()=> {
        expect(Reducer(undefined, {type:'POST', newArticle}))
        .to.eql({...initialState, nextId: initialState.nextId + 1,
            article: [...initialState.article, 
            {id: initialState.nextId, text: newArticle.text, date: newArticle.date, img: newArticle.img, comments: newArticle.comments, author: newArticle.author}
            ]})
    })

    
    it('should set the search keyword', ()=>{
        expect(Reducer(undefined, {type:'SET_KEYWORD', newKeyword})).to.eql({...initialState, keyword: newKeyword}})
    })

    it('should filter displayed articles by the search keyword',()=> {
        expect(Reducer(undefined,{type:'FILTER_KEYWORD', newKeyword})).to.eql(...initialState, filteredArticles: [{id:9, text:'this is test purpose for hy23 only', date:'2015-05-10T15:22:03.638Z', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg', comments: [], author: 'Follower'}]);
    })
})