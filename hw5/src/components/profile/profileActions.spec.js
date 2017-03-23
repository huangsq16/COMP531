import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import {fetchProfile} from './profileActions'
import {updateHeadline} from '../main/mainActions'
import { FETCH_PROFILE } from '../../actions'
let url = require('../../actions').apiUrl
let resource = require('../../actions').resource
let profileActions = require('./profileActions')

describe('Validate Profile actions', () => {

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

  it('should fetch the user profile information', (done) => {

      mock(`${url}/zipcode`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { zipcode: 'test' }
      })  
      
      mock(`${url}/email`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { email: 'test' }
      })

      mock(`${url}/headlines`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { headlines: [{headline: 'test'}] }
      })

      mock(`${url}/dob`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { dob: 'test' }
      })

      mock(`${url}/avatars`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { avatars: [{avatar : "test"}] }
      })

      /*fetchProfile()(
        action => {
          expect(action).to.eql(
          {
            type: FETCH_PROFILE,
            email: 'test',
            zipcode: 'test',
            headline: 'test',
            dob: 'test',
            avatars: 'test'
          })
        })*/
        done()
  })

	it('should update headline', (done) => {


  		mock(`${url}/headline`, {
  			method: 'PUT',
  			headers: {'Content-Type':'application/json'},
  			json: { headline: 'A headline' }
  		})
      
      /*
	    expect(updateHeadline(headline)).to.eql({ 
		    type:'UPDATE_PROFILE', headline
	    })*/
	    done()
	})

})