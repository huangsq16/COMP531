import { ERRORMSG, UPDATE_PROFILE, FETCH_PROFILE, UPDATE_AVATAR, resource } from '../../actions'
import {updateHeadline} from '../main/mainActions'
import Promise from 'bluebird'
// errorMessage for alerting
let errorMessage = '';

// load reg pattern
const namepattern = '^[A-Za-z][a-zA-Z0-9]*$';
const emailpattern = '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$';
const phonepattern = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';
const zippattern = '^[0-9]{5}$';

// set flag
let update = false;
let valid = true;

export const CLEAR_ERR = 'CLEAR_ERR';
export const clearErr = () => {
	return {
		type : CLEAR_ERR
	}
}

export const fetchProfile = () => {
	const action = {type: FETCH_PROFILE }
	const headlineFetch = resource('GET', 'headlines').then(r => {
		action['headline'] = r.headlines[0].headline
	})
	const emailFetch = resource('GET', 'email').then(r => {
		action['email'] = r.email
	})
	const zipcodeFetch = resource('GET', 'zipcode').then(r => {
		action['zipcode'] = r.zipcode
	})
	const dobFetch = resource('GET', 'dob').then(r => {
		action['dob'] = r.dob
	})
	const avatarsFetch = resource('GET', 'avatars').then(r => {
		action['avatars'] = r.avatars[0].avatar
	})
	return (dispatch) => {Promise.all([headlineFetch,emailFetch, zipcodeFetch, dobFetch, avatarsFetch]).then(
		r => dispatch(action))}
}

export function updateProfile(info) {
	// reset errorMessage and flag
	errorMessage = '';
	update = false;
	valid = true;
	//check valid for each input
	checkvalid(info.email, emailpattern, 'Email');
	checkvalid(info.zipcode, zippattern, 'Zip Code');
	checkvalid(info.password, info.confirmPassword, 'Password');
	const action = { type: UPDATE_PROFILE }
	return (dispatch) => {
		updateHeadline(info.headline)(dispatch)
		if (valid) {
		let updateFlag = true;
		const successMsg = 'Update succeed';
		const emailUpdate = resource('PUT', 'email', {email: info.email})
		.then(r => { action['email'] = r.email })
		.catch(_ => {
			updateFlag = false;
		})
		const zipcodeUpdate = resource('PUT', 'zipcode', {zipcode: info.zipcode})
		.then(r => { action['zipcode'] = r.zipcode})
		.catch(_ => {
			updateFlag = false;
		})
		const passwordUpdate = resource('PUT', 'password', {password: info.password})
		.then(r => {})
		.catch(_ => {
			updateFlag = false;
		})
		Promise.all([emailUpdate, zipcodeUpdate, passwordUpdate]).then(
			r => {
				if (updateFlag){
					dispatch({
					type: UPDATE_PROFILE,
					successMsg,
					action
					})
				} else {
					errorMessage = 'update failed'
					dispatch({
						type: ERRORMSG,
						errorMsg: errorMessage	
					}) 
				} 	
			})
	} else {
		return dispatch({
			type: ERRORMSG,
			errorMsg: errorMessage
		})	
	}
}
}

export function updateAvatar(file) {
	const fd = new FormData()
	fd.append('image', file.target.files[0])
	return (dispatch) => {
		resource('PUT', 'avatar', fd, false)
		.then(r => {
			dispatch({
				type: UPDATE_AVATAR,
				avatar: r.avatar
			})
		})
	}
}
	
function checkvalid(element, pattern, type) {
	if (type === 'Password') {
		if (element != '' && !(element === pattern)) {
			valid = false;
			errorMessage += type + ' are not same or empty, please double check;\n ';
		}
	} else {
		var reg = new RegExp(pattern, 'g');
		if (element != '' && !reg.test(element)) {
			valid = false;
			errorMessage += type + ' is invalid, please double check;\n ';
		}
	}
}





