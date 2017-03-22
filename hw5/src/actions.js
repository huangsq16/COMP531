
const url = 'https://webdev-dummy.herokuapp.com'

export const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        throw new Error(r.statusText)
      }
    })
}
export const FETCH_PROFILE = 'FETCH_PROFILE'

export const FILTER_KEYWORD = "FILTER_KEYWORD";
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
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export function errorMsg(msg){
    return {type: ERRORMSG, errorMsg: msg};
}

export function successMsg(msg){
    return {type: SUCCESSMSG, successMsg: msg};
}