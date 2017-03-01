import * as Actions from './actions'

const articlesItems = require('./data/article.json');
const followersItems = require('./data/followers.json');
const profile = require('./data/profile.json');

const Reducer = (state = {
    location : "signIn",
    errorReg : "",
    successMsg: "",
    profile: 1,
    nextId: 10,
    nextFollowerId: 3,
    followers: followersItems.followers,
    article : articlesItems.articles,
    userinfo: profile.userinfo
}, action) => {
    switch (action.type) {
        case Actions.NAV_LANDING:
            return { ...state, location : "landing" }
        case Actions.NAV_MAIN:
            return { ...state, location : "main", profile: 1 }
        case Actions.NAV_PROFILE:
            return { ...state, location : "profile", profile: 0}
        case Actions.NEW_USER_INFO:
            return { ...state, location : "main", userinfo : action.info}
        case Actions.ERROR_REGISTER:
            return { ...state, errorReg : action.errorMessage }
        case Actions.SUCCESS:
            return { ...state, successMsg : action.errorMessage, userinfo : action.info }
        case Actions.CLEAR_ERR:
            return { ...state, errorReg : "" }
        case Actions.NAV_SIGNIN:
            return {...state, location : "signIn"}
        case Actions.NAV_SIGNUP:
            return {...state, location : "signUp"}
        case Actions.FILTER_KEYWORD:
            return {...state, article: state.article.filter((a) => {return a.text.indexOf(action.keyword) > 0 || a.author == action.keyword})}
        case Actions.ADD_FOLLOWER:
            return {...state, nextFollowerId: state.nextFollowerId + 1,
                followers: [...state.followers,
                {id: state.nextFollowerId, name: action.name, avatar: action.avatar, headline: action.headline}
                ]}
        case Actions.REMOVE_FOLLOWER:
            return {...state, followers: state.followers.filter((f) => {return f.id != action.id})}
        case Actions.POST:
            return {...state, nextId: state.nextId + 1,
                article: [...state.article,
                {id: state.nextId, text: action.text, date: action.date, img: action.img, comments: action.comments, author: action.author}
                ]}
        case Actions.UPDATE_HEADLINE:
            return {...state, userinfo: {...state.userinfo, userHeadline: action.text}}
        default:
            return state
    }
}

export default Reducer