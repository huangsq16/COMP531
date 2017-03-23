import * as Actions from './actions'

const Reducer = (state = {
    location : "signIn",
    errorMsg : "",
    successMsg: "",
    keyword: "",
    username: "",
    headline: "",
    avatar: "",
    zipcode: "",
    email: "",
    dob: "",
    flag: 1,
    followers: [],
    article : [],
    filteredArticles: []
}, action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return {...state, location: "main", flag: 1, password: action.password, username: action.username }
        case Actions.NAV_LANDING:
            return { ...state, location : "landing", errorMsg : "", successMsg: "" }
        case Actions.NAV_MAIN:
            return { ...state, location : "main", flag: 1, errorMsg : "", successMsg: ""}
        case Actions.NAV_PROFILE:
            return { ...state, location : "profile", flag: 0, errorMsg : "", successMsg: ""}
        case Actions.NAV_SIGNIN:
            return {...state, location : "signIn", errorMsg : "", successMsg: ""}
        case Actions.NAV_SIGNUP:
            return {...state, location : "signUp", errorMsg : "", successMsg: ""}
        case Actions.ERRORMSG:
            return {...state, errorMsg: action.errorMsg}
        case Actions.SUCCESSMSG:
            return {...state, successMsg: action.successMsg}
        case Actions.CLEAR_ERR:
            return { ...state, errorMsg : "", successMsg: "" }
        case Actions.FILTER_KEYWORD:
            return {...state, keyword : action.keyword, filteredArticles: (state.keyword.length == 0) ? (state.article) : state.article.filter((a) => {return a.text.indexOf(action.keyword) >= 0 || a.author == action.keyword})}
        case Actions.FETCH_FOLLOWER:
            return {...state, followers: action.followers, 
                article: [...state.article, ...Actions.followersArticle(action.followers)]}
        case Actions.ADD_FOLLOWER:
            return {...state, 
                followers: [...state.followers,{name: action.followers.name, avatar: action.followers.avatar, headline: action.followers.headline}], 
                article: Actions.sortArticle([...state.article, ...action.followers.article]),
                filteredArticles: Actions.filterArticle([...state.article, ...action.followers.article], state.keyword)
            }
        case Actions.REMOVE_FOLLOWER:
            return {...state, followers: state.followers.filter((f) => {return f.name != action.username}), 
            article: Actions.sortArticle(state.article.filter((a) => {return a.author != action.username})),
            filteredArticles: Actions.filterArticle(Actions.sortArticle(state.article.filter((a) => {return a.author != action.username})), state.keyword)
        }
        case Actions.FETCH_ARTICLES:
            return {...state, article: action.sortedArticles, filteredArticles: action.sortedArticles}
        case Actions.POST:
            return {...state, article: [action.article, ...state.article], filteredArticles: [action.article, ...state.filteredArticles]}
        case Actions.UPDATE_HEADLINE:
            return {...state, headline: action.text }
        case Actions.UPDATE_PROFILE:
            return {...state, successMsg: action.successMsg, email: action.action.email, zipcode: action.action.zipcode}
        case Actions.FETCH_PROFILE:
            return {...state, headline: action.headline, email: action.email, zipcode: action.zipcode, dob: new Date(action.dob), avatar: action.avatars}
        default:
            return state
    }
}

export default Reducer