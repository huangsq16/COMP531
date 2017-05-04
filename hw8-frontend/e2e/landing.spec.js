import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Landing Page', () => {

    it('should login as test user', (done) => {
        go().then(landing.login).then(done)
    })

    it('should register as a new user', (done) => {
        go().then(landing.register).then(done)
    })
   
})