import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import {ArticleView} from './articleView'
import {NewArticle} from './newArticle' 
import { shallow } from 'enzyme'
import Reducer from '../../reducers'


const articlesItems = require('../data/article.json');
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

const article = [{"id":9,"text":"this is test purpose for hy23 only","date":"2015-05-10T15:22:03.638Z","img":"https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg","comments":[],"author":"Follower"}]
describe('ArticlesView (component tests)', ()=>{

    it('should render articles', () => {
    	const node = TestUtils.renderIntoDocument(
    		<div>
            	<ArticleView articles = article/>
        	</div>
        )
        expect(node.children().length).to.eql(3);
    })

    it('should dispatch actions to create a new article',()=> {
        let toggled = false
        const componentTree = TestUtils.renderIntoDocument(<div><NewArticle /></div>)
        const input = TestUtils.findRenderedDOMComponentWithClass(componentTree, 'text-submit')
        
        TestUtils.Simulate.click(input)
        expect(toggled).to.be.true
    })
})
