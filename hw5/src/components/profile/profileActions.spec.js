import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * from './profileActions'
import * as Action from '../../actions'


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
  
      const info = {
        email: 'hy@rice.edu',
        zip: '77005',
        password: '123'
      }

      mock(`${url}/zipcode`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { zipcode: 'test' }
      })  
      
      mock(`${url}/email`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { email: 'test' }
      })

      mock(`${url}/password`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { password: 'test' }
      })

      expect(updateProfile(info)).to.eql({
        type: SUCCESS,
        "Update succeed",
        {
          email: 'test',
          zipcode: 'test',
          password: 'test'
        }
      })
  })

	it('should update headline', (done) => {

  		mock(`${url}/headline`, {
  			method: 'PUT',
  			headers: {'Content-Type':'application/json'},
  			json: { headline: 'A headline' }
  		})
  
	    expect(updateHeadline(headline)).to.eql({ 
		    type:'UPDATE_PROFILE', headline
	    })
	    done()
	})

})