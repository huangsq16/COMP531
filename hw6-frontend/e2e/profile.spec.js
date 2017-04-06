import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Profile Page', () => {

    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })

    it("Update user email and verify", (done) => {
        sleep(500)
        .then(findId('toProfile').click())
        .then(sleep(1000))
        .then(findId('profile-email').sendKeys('hy@rice.edu'))
        .then(findId('updateProfile').click())
        .then(sleep(1000))
        .then(findId('profile-email').getAttribute('placeholder')
            .then(text=>{expect(text).to.eql('hy@rice.edu')}))
        .then(done)
    })

    it("Update user zipcode and verify", (done) => {
        sleep(500)
        .then(findId('profile-zipcode').sendKeys(12345))
        .then(findId('updateProfile').click())
        .then(sleep(2000))
        .then(findId('profile-zipcode').getAttribute('placeholder')
            .then(text=>{expect(text).to.eql('12345')}))
        .then(done)
    })

    it("Update user password and verify", (done) => {
        sleep(500)
        .then(findId('profile-password').sendKeys('123'))
        .then(findId('profile-confirm-password').sendKeys('123'))
        .then(findId('updateProfile').click())
        .then(sleep(1000))
        .then(findId('profile-sucmsg').getText()
            .then((text)=>{expect(text).to.equal('Update succeed')}))
        .then(done)
    })

})
