// msg for alerting
var msg = "";

// load reg pattern
var namepattern = "^[A-Za-z][a-zA-Z0-9]*$";
var emailpattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$";
var phonepattern = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";
var zippattern = "^[0-9]{5}$";

// set flag
var update = false;
var valid = true;

window.onload = function() {
	var btn = document.getElementById("update-btn");
	btn.addEventListener("click", updateprofile, false);
}

function updateprofile() {
	// reset msg and flag
	msg = "";
	update = false;
	valid = true;

	//cache element
	var successtxt = document.getElementById("success-txt");
	var failtxt = document.getElementById("fail-txt");
	var success = document.getElementById("success");
	var fail = document.getElementById("fail");
	var usrname = document.getElementById("usrname");
	var usremail = document.getElementById("usremail");
	var usrphone = document.getElementById("usrphone");
	var usrzip = document.getElementById("usrzip");
	var usrpwd = document.getElementById("usrpwd");
	var usrpwdcfm = document.getElementById("cfmusrpwd");
	var curname = document.getElementById("curname");
	var curemail = document.getElementById("curemail");
	var curphone = document.getElementById("curphone");
	var curzip = document.getElementById("curzip");
	var curpwd = document.getElementById("curpwd");
	var cfmpwd = document.getElementById("cfmpwd");

	//reset alert
	fail.style.display = "none";
	success.style.display = "none";
	failtxt.innerHTML = "";
	successtxt.innerHTML = "";

	//check valid for each input
	checkvalid(usrname, namepattern, "Display Name");
	checkvalid(usremail, emailpattern, "Email");
	checkvalid(usrphone, phonepattern, "Phone");
	checkvalid(usrzip, zippattern, "Zip Code");
	checkvalid(usrpwd, usrpwdcfm, "Password");

	if (valid) {
		checkupdate(curname, usrname, "Display Name");
		checkupdate(curemail, usremail, "Email");
		checkupdate(curphone, usrphone, "Phone");
		checkupdate(curzip, usrzip, "Zip Code");
		checkupdate(curpwd, usrpwd, "Password");
		success.style.display = "block";
		if (update) {
			successtxt.innerHTML = msg;
		}
		
	} else {
		fail.style.display = "block";
		failtxt.innerHTML = msg;
	}

	clearinput(usrname);
	clearinput(usremail);
	clearinput(usrphone);
	clearinput(usrzip);
	clearinput(usrpwd);
	clearinput(usrpwdcfm);
}

function checkvalid(element, pattern, type) {
	if (type === "Password") {
		if (element.value != "" && !(element.value === pattern.value)) {
			valid = false;
			msg += type + " are not same or empty, please double check;\n ";
		}
	} else {
		var reg = new RegExp(pattern, 'g');
		if (element.value != "" && !reg.test(element.value)) {
			valid = false;
			msg += type + " is invalid, please double check;\n ";
		}
	}
}

function checkupdate(curcontent, newcontent, type) {
	if (newcontent.value != "" && !(curcontent.innerHTML === newcontent.value)) {
		update = true;
		msg += type + " is updated from " + curcontent.innerHTML + " to " + newcontent.value;
		curcontent.innerHTML = newcontent.value;
	}
}

function clearinput(element) {
	element.value = "";
}



