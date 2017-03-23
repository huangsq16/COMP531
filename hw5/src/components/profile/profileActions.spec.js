import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Profile actions', () => {
  let actions, profileActions, mainActions
	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
      actions = require('../../actions')
      profileActions = require('./profileActions')
      mainActions = require('../main/mainActions')
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

  it('should fetch the user profile information', (done) => {

      mock(`${actions.apiUrl}/zipcode`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { zipcode: 'test' }
      })  
      
      mock(`${actions.apiUrl}/email`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { email: 'test' }
      })

      mock(`${actions.apiUrl}/headlines`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { headlines: [{headline: 'test'}] }
      })

      mock(`${actions.apiUrl}/dob`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { dob: 'test' }
      })

      mock(`${actions.apiUrl}/avatars`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { avatars: [{avatar : "test"}] }
      })

      profileActions.fetchProfile()(
        action => {
          expect(action).to.eql(
          {
            type: 'FETCH_PROFILE',
            email: 'test',
            zipcode: 'test',
            headline: 'test',
            dob: 'test',
            avatars: 'test'
          })
        })
        done()
  })

	it('should update headline', (done) => {
      const _headline = 'new headline'

  		mock(`${actions.apiUrl}/headline`, {
  			method: 'PUT',
  			headers: {'Content-Type':'application/json'},
  			json: { headline: _headline }
  		})
      
	    mainActions.updateHeadline(_headline)(action => {
        expect(action).to.eql({ 
          type: 'UPDATE_HEADLINE', text: _headline
        })
      })
	    done()
	})

})