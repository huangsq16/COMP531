import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import * as action from './actions'
import Reducer from './reducers'

const initialState = {
    location : "signIn",
    errorMsg : "",
    successMsg: "",
    keyword: "",
    username: "",
    headline: "",
    avatar: "",
    zipcode: "",
    email: "",
    dob: "",
    flag: 1,
    followers: [],
    article : [],
    filteredArticles: []
}

const newArticle = {
    text: "test",
    date: "2015-09-05T06:25:36.770Z",
    img: "http://lorempixel.com/340/241/",
    comments: [],
    author: "test"
}

    
describe('Validate reducer (no fetch requests here)', ()=> {
    it('should return the initial state', ()=>{
        expect(Reducer(undefined, {})).to.eql(initialState)
    })

    it('should state success (for displaying success message to user)', ()=>{
        const successMsg = 'test'
        expect(Reducer(undefined, {type:'SUCCESSMSG', successMsg}))
        .to.eql({...initialState, successMsg: successMsg})
    })

    it('should state error (for displaying error message to user)', ()=>{
        const errorMsg = 'test'
        expect(Reducer(undefined, {type:'ERRORMSG', errorMsg}))
        .to.eql({...initialState, errorMsg: errorMsg})
    })

    it('should set the articles',()=> {
        
        expect(Reducer(undefined, {type:'ADD_ARTICLE', article: newArticle}))
        .to.eql({...initialState, article: [newArticle], filteredArticles: [newArticle]})
    })

    it('should set the search keyword', ()=>{
        expect(Reducer(undefined, {type:'FILTER_KEYWORD', keyword: 'test'})).to.satisfy(
            action => {
                return action.keyword == 'test'
            }
        )
    })

    it('should filter displayed articles by the search keyword',()=> {
        expect(Reducer(undefined,{type:'FILTER_KEYWORD', keyword: 'aa'})).to.eql({...initialState, keyword: 'aa'});
    })
})