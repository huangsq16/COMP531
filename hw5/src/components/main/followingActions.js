import { FETCH_FOLLOWERS, ADD_FOLLOWER, REMOVE_FOLLOWER, resource } from '../../actions'

export const getFollower = () => {
	resource('GET', 'following').then(r => {
		return {
			type : FETCH_FOLLOWERS,
			follower : r.following
		}
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
}