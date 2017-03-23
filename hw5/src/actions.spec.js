import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import {apiUrl, resource, errorMsg, successMsg} from './actions'
import {navLanding, navProfile, navMain} from './components/main/mainActions'

describe('Validate actions (these are functions that dispatch actions)', () => {

	let Action, actions
	beforeEach(() => {

		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		actions = require('./actions') 

	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${apiUrl}/sample`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			articles: {'test': "test"}
		})

		resource('GET', 'sample').then((response) => {

			expect(response.articles).to.exist;
		})
		.then(done)
		.catch(done)
	})


	it('resource should give me the http error', (done)=> {
		const username = 'hy23'
		const password = '1234'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).catch((err) => {
			expect(err.toString()).to.eql('Error: Unauthorized')
		})
		.then(done)
		.catch(done)
	})


	it('resource should be POSTable', (done)=> {
		const username = 'guest'
		const password = 'visitor'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).then((response) => {
			expect(response).to.eql({username: "guest", result: "success"})
		})
		.then(done)
		.catch(done)
	})


	it('should update error message (for displaying error mesage to user)', ()=>{
		const msg = 'error';
		const expectAction = {
			type: 'ERRORMSG',
			errorMsg: msg
		}
		expect(errorMsg(msg)).to.eql(expectAction);
	})


	it('should update success message (for displaying success message to user)', ()=>{
		const msg = 'success';
		const expectAction = {
			type: 'SUCCESSMSG',
			successMsg: msg
		}
		expect(successMsg(msg)).to.eql(expectAction);
	})


	it('should navigate (to profile, main, or landing)', ()=>{
		expect(navLanding()).to.eql({type: 'NAVIGATE_LANDING'});
		expect(navMain()).to.eql({type: 'NAVIGATE_MAIN'});
		expect(navProfile()).to.eql({type: 'NAVIGATE_PROFILE'});
	})
})