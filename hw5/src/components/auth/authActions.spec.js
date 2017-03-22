import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { handleLogin, logOut } from './authActions'

describe('Validate Authenticate Actions', () => {
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
 
    it('should log in a user', (done)=>{

        const username = "hy23"
        const password = "123"

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })
       
        expect(handleLogin(username, password)).to.eql({
            type:'LOGIN_LOCAL',
            username,
            password
        })
        done()
    })


     it('should not log in an invalid user', (done)=>{

        const username2 = 'abcd'
        const password2 = '123'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

        expect(handleLogin(username2, password2)).to.eql({
            type:'ERRORMSG',
            error : 'Unauthorized'
        })
        done()

    })

    it('should log out a user (state should be cleared)', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })
        
        expect(logOut()).to.eql({
            type:'NAV_SIGNIN'
        })
        done()   
    })
})