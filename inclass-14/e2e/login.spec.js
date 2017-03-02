import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        let headline;
        sleep(500)
            .then(findId('message').getText()
                .then(text => headline = text)
                .then(findId('newHeadline').clear()))

        let newheadline = 'new headline'
        sleep(500)
            .then(findId('newHeadline').sendKeys(newheadline)
                .then(findId('headline').click())
                .then(findId('message').getText()
                    .then(text => {expect(text).to.equal(newheadline)})
                    .then(findId('newHeadline').clear())))

        sleep(50)
            .then(findId('newHeadline').sendKeys(headline)
                .then(findId('headline').click())
                .then(findId('message').getText()
                    .then(text => {expect(text).to.equal(newheadline)})))

        done()
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
