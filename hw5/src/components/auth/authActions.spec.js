import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate Authenticate Actions', () => {
    let authActions, actions
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        actions = require('../../actions')
        authActions = require('./authActions') 
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    }) 
 
    it('should log in a user', (done)=>{

        const username = "abcd"
        const password = "123"

        mock(`${actions.apiUrl}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })
       
        authActions.handleLogin(username, password)(
            action => {
                expect(action).to.eql({
                    type:'LOGIN',
                    username,
                    password
                })
            })
        done()
    })


     it('should not log in an invalid user', (done)=>{

        const username2 = 'abcd'
        const password2 = '123'

        mock(`${actions.apiUrl}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

        authActions.handleLogin(username2, password2)(
            action => {
                expect(action).to.eql({
                    type:'ERRORMSG',
                    error : 'Unauthorized'
                })
            })
        done()

    })

    it('should log out a user (state should be cleared)', (done)=>{
        mock(`${actions.apiUrl}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })
        authActions.logout()(action => {
            expect(action).to.eql({
                type:'NAV_SIGNIN'
            })
        })
        done()   
    })
})