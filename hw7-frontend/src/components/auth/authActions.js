import { LOGIN, NAV_SIGNUP, NAV_SIGNIN, NAV_MAIN, NEW_USER_INFO, ERRORMSG, SUCCESSMSG, CLEAR_ERR, resource } from '../../actions'
import {fetchArticle} from '../article/articleActions'
import {getFollower} from '../main/followingActions'
import {fetchProfile} from '../profile/profileActions'
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

export const logout = () => {
  return dispatch => {resource('PUT', 'logout')
    .then(r => {
        dispatch({
            type: NAV_SIGNIN
        })
    } )
}
}
/*
	The function sends userinfo to backend and once succeed, the website will be directed to main page
*/
export const handleLogin = (userinfo) => {
	errorMessage = "";
	valid = true;
    
    return (dispatch) => {
        resource('POST', 'login', userinfo)
        .then(r => {
			if (r !== 'fail') { 
				dispatch({type: LOGIN, username: userinfo.username, password: userinfo.password})
				fetchArticle()(dispatch)
				getFollower()(dispatch)
				fetchProfile()(dispatch)
			} else {
				dispatch({
					type: 'ERRORMSG',
					errorMsg: 'login failed'
				}) 
			}
        }).catch(err => {
            dispatch({
                type: 'ERRORMSG',
                errorMsg: 'login failed'
            }) 
        })
    }
}

export const login = (userinfo) => {
    return (dispatch) => {
        resource('POST', 'login', userinfo)
        .then(r => {
			if (r !== 'fail') { 
				dispatch({type: LOGIN, username: userinfo.username, password: userinfo.password})
			} else {
				dispatch({type: ERRORMSG, errorMsg: 'login failed'})
			}
        }).catch(err => {
            dispatch({
                type: 'ERRORMSG',
                errorMsg: err.message
            }) 
        })
    }
}
/*
	The function sends userinfo to backend and once succeed, the website will be directed to main page
*/
export const handleSubmit = ({displayName, email, phone, zip, birthDate, password, confirmPassword}) => {
	errorMessage = "";
	valid = true;
    handleEmailChange(email, "email");
    handlePhoneChange(phone, "phone");
    handleZipChange(zip, "zip");
    handleBirthDateChange(birthDate, "date");
    handleConfirmPasswordChange(password, confirmPassword, "password");
    return (dispatch) => {
        if (valid) {
        const userinfo = { username: displayName, email: email, birth: birthDate, zip: zip, password: password}
        resource('POST', 'register', userinfo).then((r) => {
            if (r === 'fail') {
                dispatch({ type: ERRORMSG, errorMsg: 'register failed'})
            } else {
                handleLogin({username: displayName, password:password})(dispatch)
            }
        })
    } else {
        dispatch({ type: ERRORMSG, errorMsg: errorMessage}) 
    }
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

