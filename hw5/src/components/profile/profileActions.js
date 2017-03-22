import { ERRORMSG, UPDATE_PROFILE, FETCH_PROFILE, resource } from '../../actions'

// errorMessage for alerting
var errorMessage = "";

// load reg pattern
const namepattern = "^[A-Za-z][a-zA-Z0-9]*$";
const emailpattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$";
const phonepattern = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";
const zippattern = "^[0-9]{5}$";

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
	resource('GET', 'email').then(r => {
		action['email'] = r.email
	})
	resource('GET', 'zipcode').then(r => {
		action['zipcode'] = r.zipcode
	})
	resource('GET', 'dob').then(r => {
		action['dob'] = r.dob
	})
	resource('GET', 'avatars').then(r => {
		action['avatars'] = r.avatar
	})
	return action
}
export function updateProfile(info) {
	// reset errorMessage and flag
	errorMessage = "";
	update = false;
	valid = true;

	//check valid for each input
	checkvalid(info.email, emailpattern, "Email");
	checkvalid(info.zip, zippattern, "Zip Code");
	checkvalid(info.password, info.ConfirmPassword, "Password");
	const action = { type: UPDATEPROFILE }
	if (valid) {
		let updateFlag = true;
		const successMsg = "Update succeed";
		resource('PUT', 'email', {email: info.email})
		.then(r => { action['email'] = r.email })
		.catch(_ => {
			updateFlag = false;
		})
		resource('PUT', 'zipcode', {zipcode: info.zip})
		.then(r => { action['zipcode'] = r.zipcode})
		.catch(_ => {
			updateFlag = false;
		})
		resource('PUT', 'password', {password: info.password})
		.then(r => { action['password'] = r.password})
		.catch(_ => {
			updateFlag = false;
		})
		if (updateFlag) {
			return {
				type: UPDATE_PROFILE,
				successMsg,
				action
			}
		} else {
			errorMessage = "update failed"
			return {
				type: ERRORMSG,
				errorMessage	
			}	
		}
	} else {
		return {
			type: ERROR_REGISTER,
			errorMessage
		}	
	}
}

function checkvalid(element, pattern, type) {
	if (type === "Password") {
		if (element != "" && !(element === pattern)) {
			valid = false;
			errorMessage += type + " are not same or empty, please double check;\n ";
		}
	} else {
		var reg = new RegExp(pattern, 'g');
		if (element != "" && !reg.test(element)) {
			valid = false;
			errorMessage += type + " is invalid, please double check;\n ";
		}
	}
}





