var clicked = false;

window.onload = function() {
	var btn = document.getElementById("btn");
	btn.addEventListener("mouseover", micehover, false);
	btn.addEventListener("click", miceclick, false);
}

function micehover() {
	if (!clicked && !event.shiftKey) {
		var movingbutton = document.getElementById("btn");
		var buttonwidth = movingbutton.offsetWidth;
		var buttonheight = movingbutton.offsetHeight;
		var randomX = Math.random() * (window.innerWidth-buttonwidth);
		var randomY = Math.random() * (window.innerHeight-buttonheight);
		movingbutton.style.position = "absolute";
		movingbutton.style.left = randomX + "px";
		movingbutton.style.top = randomY + "px";
	}	
}

function miceclick() {
	if (!clicked) {
		clicked = true;
		var txt = document.getElementById("txt");
		txt.innerHTML = "Play Again";
		var msg = document.getElementById("msg");
		msg.style.display = "block";
	} else {
		clicked = false;
		var txt = document.getElementById("txt");
		txt.innerHTML = "Click me!";
		var msg = document.getElementById("msg");
		msg.style.display = "none";
	}
}


