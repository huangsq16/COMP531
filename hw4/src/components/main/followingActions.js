import { ADD_FOLLOWER, REMOVE_FOLLOWER } from '../../actions'
export const addFollower = (username) => {
	return {
		type : ADD_FOLLOWER,
		name : username,
		avatar : "http://img.hb.aicdn.com/08653c6e238c66f8e04a40abab5f6992f544856e5172a-2exdOm_sq320",
		headline : "new follower"
	}
}

export const removeFollower = (id) => {
	return {
		type : REMOVE_FOLLOWER,
		id
	}
}