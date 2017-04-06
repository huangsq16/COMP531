import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export const apiUrl = 'https://webdev-dummy.herokuapp.com'
export const LOGIN = 'LOGIN'
export const FETCH_PROFILE = 'FETCH_PROFILE'
export const FETCH_FOLLOWER = 'FETCH_FOLLOWER'
export const FILTER_KEYWORD = 'FILTER_KEYWORD'
export const NAV_SIGNUP = 'NAV_SIGNUP'
export const NAV_LANDING = 'NAVIGATE_LANDING'
export const NAV_PROFILE = 'NAVIGATE_PROFILE'
export const NAV_MAIN = 'NAVIGATE_MAIN'
export const NAV_SIGNIN = 'NAV_SIGNIN'
export const NEW_USER_INFO = 'NEW_USER_INFO'
export const CLEAR_ERR = 'CLEAR_ERR'
export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'
export const POST = 'ADD_ARTICLE'
export const UPDATE_HEADLINE = 'UPDATE_HEADLINE'
export const ERRORMSG = 'ERRORMSG'
export const SUCCESSMSG = 'SUCCESSMSG'
export const FETCH_ARTICLES = 'FETCH_ARTICLES'
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_AVATAR = 'UPDATE_AVATAR'
export const EDIT_REQUEST = 'EDIT_REQUEST'
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST'
export const EDIT_FINISHED = 'EDIT_FINISHED'
export const COMMENT_EDIT_FINISHED = 'COMMENT_EDIT_FINISHED'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const resource = (method, endpoint, payload, isJson = true) => {
  const options =  {method:method, credentials: 'include'}
  if (isJson) {
    options.headers= {'Content-Type': 'application/json'}
    if (payload) {options.body = JSON.stringify(payload)}
  } else {
    options.body = payload
  }
  return fetch(`${apiUrl}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        return r.status
      }
    })
}

export function errorMsg(msg){
  return {type: ERRORMSG, errorMsg: msg};
}

export function successMsg(msg){
  return {type: SUCCESSMSG, successMsg: msg};
}

export function sortArticle(article) {
  if (article != undefined) {
    return article.sort(function(a, b) {
      let x = new Date(a.date)
      let y = new Date(b.date)
      return ((x>y) ? -1 :((x<y)?1:0))
    })
  } else {
    return []
  }
}

export function filterArticle(article, keyword) {
  if (keyword.length == 0) {
    return sortArticle(article)
  } else {
    const filtered = article.filter((a) => {return a.text.indexOf(keyword) >= 0 || a.author == keyword})
    return sortArticle(filtered)
  }
}

export function followersArticle(followers) {
  if (followers != undefined) {
    const article = []
    followers.forEach(a => {
      article.push(...a.article)
    })
    return article
  } else {
    return []
  }
}