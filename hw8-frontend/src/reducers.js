import * as Actions from './actions'

const Reducer = (state = {
    location : 'signIn',
    errorMsg : '',
    successMsg: '',
    keyword: '',
    username: '',
    headline: '',
    avatar: '',
    zipcode: '',
    email: '',
    dob: '',
    flag: 1,
    isEdit: false,
    isCommentEdit: false,
    followers: [],
    article : [],
    Oauth : 0,
    provider: ""
}, action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return { ...state, location: 'main', flag: 1, username: action.username }
        case Actions.OAUTH: 
            return { ...state, Oauth: 1, provider: action.provider }
        case Actions.NAV_LANDING:
            return { ...state, location : 'landing', Oauth: 0, errorMsg : '', successMsg: '' }
        case Actions.NAV_MAIN:
            return { ...state, location : 'main', flag: 1, errorMsg : '', successMsg: ''}
        case Actions.NAV_PROFILE:
            return { ...state, location : 'profile', flag: 0, errorMsg : '', successMsg: ''}
        case Actions.NAV_SIGNIN:
            return {...state, location : 'signIn', errorMsg : '', successMsg: ''}
        case Actions.NAV_SIGNUP:
            return {...state, location : 'signUp', errorMsg : '', successMsg: '', keyword: ''}
        case Actions.ERRORMSG:
            return {...state, errorMsg: action.errorMsg}
        case Actions.SUCCESSMSG:
            return {...state, successMsg: action.successMsg}
        case Actions.CLEAR_ERR:
            return { ...state, errorMsg : '', successMsg: '' }
         case Actions.FILTER_KEYWORD:
            return {...state, keyword : action.keyword}
        case Actions.FETCH_FOLLOWER:
            return {...state, followers: action.followers, 
                article: [...state.article, ...Actions.followersArticle(action.followers)]}
        case Actions.ADD_FOLLOWER:
            return {...state, errorMsg : '',
                followers: [{name: action.followers.name, avatar: action.followers.avatar, 
                    headline: action.followers.headline}, ...state.followers], 
                article: Actions.sortArticle([...state.article, ...action.followers.article])
            }
        case Actions.REMOVE_FOLLOWER:
            return {...state, followers: state.followers.filter((f) => {return f.name != action.username}), 
            article: Actions.sortArticle(state.article.filter((a) => {return a.author != action.username}))
        }
        case Actions.FETCH_ARTICLES:
            return {...state, article: action.articles}
        case Actions.POST:
            return {...state, article: [action.article, ...state.article]}
        case Actions.UPDATE_HEADLINE:
            return {...state, headline: action.text }
        case Actions.UPDATE_PROFILE:
            return {...state, successMsg: action.successMsg, email: action.action.email, zipcode: action.action.zipcode}
        case Actions.FETCH_PROFILE:
            return {...state, headline: action.headline, email: action.email, zipcode: action.zipcode, 
                dob: action.dob, avatar: action.avatars}
        case Actions.EDIT_REQUEST:
            return {...state, isEdit: action.isEdit}
        case Actions.EDIT_COMMENT_REQUEST:
            return {...state, isCommentEdit: action.isCommentEdit}
        case Actions.UPDATE_COMMENTS:
            state.article.forEach((val, idx, arr) => {if (action.article._id == val._id) {arr[idx] = action.article}})
            return {...state, article: [...state.article]}
        case Actions.UPDATE_ARTICLES:
			state.article.forEach((val, idx, arr) => {if (action.article._id == val._id) {arr[idx] = action.article}})
            return {...state, article: [...state.article]}
        case Actions.UPDATE_AVATAR:
            return {...state, avatar: action.avatar}
        default:
            return state
    }
}

export default Reducer