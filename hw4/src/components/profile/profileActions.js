import { SUCCESS, ERROR_REGISTER } from '../../actions'

// errorMessage for alerting

var errorMessage = "";

// load reg pattern
var namepattern = "^[A-Za-z][a-zA-Z0-9]*$";
var emailpattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$";
var phonepattern = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";
var zippattern = "^[0-9]{5}$";

// set flag
var update = false;
var valid = true;
export const UPDATEPROFILE = "UPDATEPROFILE";
export const CLEAR_ERR = 'CLEAR_ERR';
export const clearErr = () => {
	return {
		type : CLEAR_ERR
	}
}

export function updateProfile(info, updateinfo) {
	// reset errorMessage and flag
	errorMessage = "";
	update = false;
	valid = true;

	//check valid for each input
	checkvalid(info.displayName, namepattern, "Display Name");
	checkvalid(info.email, emailpattern, "Email");
	checkvalid(info.phone, phonepattern, "Phone");
	checkvalid(info.zip, zippattern, "Zip Code");
	checkvalid(info.password, info.ConfirmPassword, "Password");

	if (valid) {
		errorMessage = "Update succeed";
		return {
			type: SUCCESS,
			errorMessage,
			info
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

function checkupdate(newcontent, curcontent, type) {
	if (newcontent == "") {
		newcontent = curcontent;
	} else if (newcontent!= "" && !(curcontent === newcontent)) {
		update = true;
		errorMessage += type + " is updated from " + curcontent + " to " + newcontent +" ";
		newcontent = curcontent;
	}
}





