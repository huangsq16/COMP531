import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import {ArticleView} from './articleView'
import {NewArticle} from './newArticle' 

const newArticle = {
    text: "test",
    date: "2015-09-05T06:25:36.770Z",
    img: "http://lorempixel.com/340/241/",
    comments: [],
    author: "test"
}

const article = [{"_id":9,"text":"this is test purpose for hy23 only","date":"2015-05-10T15:22:03.638Z","img":"https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg","comments":[],"author":"Follower"}]

describe('ArticlesView (component tests)', ()=>{

    it('should render articles', () => {
    	const node = TestUtils.renderIntoDocument(
    		<div>
            	<ArticleView articles = {article}/>
        	</div>
        )
        const elements = findDOMNode(node).children[0]
        expect(elements.children.length).to.eql(1);
    })

    it('should dispatch actions to create a new article',()=> {
        let toggled = false
        const node = TestUtils.renderIntoDocument(<div><NewArticle addtext = {(e,f) => { toggled = true}} /></div>)
        const elements = findDOMNode(node).children[0]
        expect(toggled).to.be.false
        TestUtils.Simulate.click(elements.children[0].children[0].children[0].children[1])
        expect(toggled).to.be.true
    })
})
