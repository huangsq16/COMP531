import { NAV_SIGNUP, NAV_SIGNIN, NAV_MAIN, NEW_USER_INFO, ERROR_REGISTER, CLEAR_ERR } from '../../actions'

let valid = true;
let errorMessage = " ";

export const clearErr = () => {
	return {
		type : CLEAR_ERR
	}
}

export const navSignIn = () => {
	return {
        type : NAV_SIGNIN
    }
}

export const navSignUp = () => {
  return {
        type : NAV_SIGNUP
    }
}

export const handleLogin = (info, user) => {
	errorMessage = "";
	valid = true;
  /*
	if (user.email != info.email || user.password != info.password) {
		errorMessage = "Your email or password is not correct.";
		return { type: ERROR_REGISTER, errorMessage};
	}*/
	return {
		type: NAV_MAIN
	}
}

export const handleSubmit = (info) => {
	errorMessage = "";
	valid = true;
	handleNameChange(info.firstName, "firstName");
    handleNameChange(info.lastName, "LastName");
    handleEmailChange(info.email, "email");
    handlePhoneChange(info.phone, "phone");
    handleZipChange(info.zip, "zip");
    handleBirthDateChange(info.birthDate, "date");
    handleConfirmPasswordChange(info.password, info.confirmPassword, "password");
    if (valid) {
        return { type: NEW_USER_INFO, info};
    } else {
    	return { type: ERROR_REGISTER, errorMessage};
    }
}

// form validation funtions
const handleNameChange = (value, name) => {
    if (value =="") {
    	valid= false;
        errorMessage= errorMessage + name + " is null, please double check;\n ";
        return;
    }
    const namepattern = "^[A-Za-z][a-zA-Z0-9]*$";
    const reg = new RegExp(namepattern, 'g');
    isValid(value, name, reg);
}

const handleEmailChange = (value, name) => {
    if (value == "") {
    	valid= false;
        errorMessage= errorMessage + name + " is null, please double check;\n ";
        return;
    }
    const emailpattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$";
    const reg = new RegExp(emailpattern, 'g');
    isValid(value, name, reg);
}

const handlePhoneChange = (value, name) => {
    if (value == "") {
    	valid= false;
        errorMessage= errorMessage + name + " is null, please double check;\n ";
        return;
    }
    const phonepattern = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";
    const reg = new RegExp(phonepattern, 'g');
    isValid(value, name, reg);
}

const handleZipChange = (value, name) => {
    if (value == "") {
    	valid= false;
        errorMessage= errorMessage + name + " is null, please double check;\n ";
        return;
    }
    const zippattern = "^[0-9]{5}$";
    const reg = new RegExp(zippattern, 'g');
    isValid(value, name, reg);
}

const handleBirthDateChange = (value, name) => {
    if (value == "") {
    	valid= false;
        errorMessage= errorMessage + name + " is null, please double check;\n ";
        return;
    }
    let birthDateArray = value.split("/");
    let birthDay = birthDateArray[1];
    let birthMonth = birthDateArray[0];
    let birthYear = birthDateArray[2];
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    if (birthYear == year-18) {
        if ((birthMonth>month) || ((birthMonth == month) && (birthDay > day))){
            valid= false;
            errorMessage= errorMessage + name + " is invalid, please double check;\n ";
            return;
        } 
    } else if(birthYear>year-18) { 
        valid= false;
        errorMessage= errorMessage + name + " is invalid, please double check;\n ";
        return;
    } 
}

const handleConfirmPasswordChange = (password, confirmPassword, name) => {
    if (password !== confirmPassword) {
        valid= false;
        errorMessage= errorMessage + name + " is invalid, please double check;\n ";
    }
}

const isValid = (value, name, reg) => {
    if (value != "" && !reg.test(value)) {
        valid= false;
        errorMessage= errorMessage + name + " is invalid, please double check;\n ";
        return;
    }
}

