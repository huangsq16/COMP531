import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'

exports.register_info = {
    username: 'test',
    email: 'hy23@rice.edu',
    phone: '123-123-1234',
    birth: '01/01/1994',
    zipcode: '77005',
    password: '12345',
    passwordconfirmation: '12345'
}

exports.login_creds = {
    username: 'hy23test',
    password: 'judge-sentence-return'
}

exports.login = () =>{sleep(500)
    .then(findId('username').sendKeys(exports.login_creds.username))
    .then(findId('password').sendKeys(exports.login_creds.password))
    .then(findId('login').click())
    .then(sleep(2000))
    .then(findId('logout').getText().then(text => {
        expect(text).to.equal('Logout')
    }))
} 
    

exports.register = () => 
    sleep(500)
    .then(findId('register').click())
    .then(sleep(2000))
    .then(findId('register_displayName').sendKeys(exports.register_info.username))
    .then(findId('register_email').sendKeys(exports.register_info.email))
    .then(findId('register_phone').sendKeys(exports.register_info.phone))
    .then(findId('register_birthDate').sendKeys(exports.register_info.birth))
    .then(findId('register_zip').sendKeys(exports.register_info.zipcode))
    .then(findId('register_password').sendKeys(exports.register_info.password))
    .then(findId('register_confirmPassword').sendKeys(exports.register_info.passwordconfirmation))
    .then(findId('register_submit').click())
    .then(sleep(2000))
    .then(findId('register_error').getText().then(text => {
        expect(text).to.equal('register not working')
    }))
   

