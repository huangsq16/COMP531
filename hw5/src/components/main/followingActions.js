import Promise from 'bluebird'
import { FETCH_FOLLOWER, ADD_FOLLOWER, REMOVE_FOLLOWER, resource, errorMsg } from '../../actions'

export function removeFollower(name) { return getFollower('DELETE', name) }
export function addFollower(name) { return getFollower('PUT', name) }

export function getFollower(method, name) {
	
    return (dispatch, getState) => {
        if (method == 'PUT' && getState().followers[name]) {
            return dispatch(errorMsg(`Already following ${name}`))
        }

        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response) => {
        	
            if (method == 'PUT' && response.following.indexOf(name) < 0) {
                return dispatch(errorMsg(`${name} is not a valid user`))
            }

            const followers = response.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
            const followerList = response.following.join(',')

            const headlinePromise = resource('GET', `headlines/${followerList}`)
                .then((response) => {
                    response.headlines.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.headline = s.headline
                        }
                    })
                })

            const avatarPromise = resource('GET', `avatars/${followerList}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.avatar = s.avatar
                        }
                    })
                })

            Promise.all([headlinePromise, avatarPromise]).then(() => {
                dispatch({type: FETCH_FOLLOWER, followers: Object.keys(followers).map(key => followers[key])})
            })
        }).catch((err) => {
            console.log(`There was an error getting your list of followed users ${err}`)
        })
    }
}/*
export const getFollower = () => {
	return (dispatch) => resource('GET', 'following').then(r => {
		const followers = r.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
        const followerList = r.following.join(',')
        console.log(Object.keys(followers).map(key => followers[key]))
        console.log(followerList)
		dispatch({
			type : FETCH_FOLLOWER,
			follower : r.following
		})
	})
}
export const addFollower = (username) => {
	resource('PUT', `following/${username}`).then(r => {
		const _username = r.username
		resource('GET', 'headline', _username).then(r => {
			const _headline = r.headline[0].headline
			resource('GET', 'avatar', _username).then(r => {
				const _avatar = r.avatars[0].avatar
				resource('GET', 'articles', _username).then(r => {
					const _articles = r.articles
					const action = {
						type : ADD_FOLLOWER,
						name : _username,
						avatar :  _avatar,
						headline: _headline,
						articles: _articles
					}
					return action
				})
			})
		})
	})
}

export const removeFollower = (username) => {
	resource('DELETE', `following/${username}`).then(r => {
		return {
			type : REMOVE_FOLLOWER,
			username
		}
	})
}*/