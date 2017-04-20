import Promise from 'bluebird'
import { FETCH_FOLLOWER, ADD_FOLLOWER, REMOVE_FOLLOWER, resource, errorMsg } from '../../actions'

/*
	The next 3 functions is for getting, adding and deleting follower, to write dry code, I wrote them together
*/
export function removeFollower(name) { return getFollower('DELETE', name) }
export function addFollower(name, follow) { return getFollower('PUT', name, follow) }
export function getFollower(method, name, flist) {
    return (dispatch, getState) => {
		dispatch({type : 'CLEAR_ERR'})
        if (method == 'PUT') {
			if (flist.length > 0) {
				const f = flist.filter((r) => { return r.name == name})
				if (f.length > 0) {
					return dispatch(errorMsg(`${name} already existed`))
				}
			}
            
        }

        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response) => {
            if (method == 'PUT' && response.following.indexOf(name) < 0) {
                return dispatch(errorMsg(`${name} does not exist`))
            }
            
            const followers = response.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
            const followerList = response.following.join(',')

            //dummy server doesn't support fetch multiple users' articles once, use forEach to solve it
            const articlePromises = response.following.map((f) => 
                resource('GET', `articles/${f}`)
                .then((response) => {
                    const user = followers[f]
                    if (user) {
                       user.article = response.articles
                    } 
                })
            )

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
            
            Promise.all([...articlePromises, headlinePromise, avatarPromise]).then(() => {
                if (method == 'DELETE') {
                    dispatch({type: REMOVE_FOLLOWER, username: name})
                } else if (method == 'PUT') {
                    dispatch({type: ADD_FOLLOWER, followers: followers[name]})
                } else {
                    dispatch({type: FETCH_FOLLOWER, followers: Object.keys(followers).map(key => followers[key])})
                }
                
            })
        }).catch((err) => {
            dispatch(errorMsg(`fetch failed`))
        })
    }
}