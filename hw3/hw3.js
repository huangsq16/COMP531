

window.onload = function() {
var raf;
var startRaf;
var pauseRaf;
var replayRaf;
var running = false;
var magnification = 1;
var highest_score = 0;
var score = 0;
var maxgap = 800;
var maxheight = 100;
var maxwidth = 50;
var minheight = 20;
var minwidth = 20;
var mingap = 300;
var maxnumber = 5;
var coin_magnification = 1;
var obstaclearray = [];
var magiccoins = [];
var index = 0;
var resume = true;
var stop = false;
var pause = false;
var over = false;
var playicon = new Image();
var pauseicon = new Image();
var replayicon = new Image();
var imgarray = ["Image/Coin1.png", "Image/Coin2.png", "Image/Coin3.png", "Image/Coin4.png", "Image/Coin5.png", "Image/Coin6.png"];
var canvas = document.getElementById("canv");
var res = document.getElementById("resume");
var txt = document.getElementById("text");
var start = document.getElementById("start");
var ctx = canvas.getContext('2d');

function drawStartIcon() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	playicon.src = "Image/play.svg";
	ctx.drawImage(playicon, canvas.width / 2 - 80 / 2,
        canvas.height / 2 - 80 / 2, 80, 80);
	startRaf = window.requestAnimationFrame(drawStartIcon);
}

function drawPauseIcon() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	pauseicon.src = "Image/pause.svg";
	ctx.drawImage(pauseicon, 670,
        50, 24, 24);

}

function drawReplayIcon() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	replayicon.src = "Image/replay.svg";
	ctx.drawImage(replayicon, canvas.width / 2 - 80 / 2,
        canvas.height / 2 - 80 / 2, 80, 80);
	ctx.font = '24px serif';
	
	ctx.strokeText(`your score: ${score}`, 240, 74);
	ctx.strokeText(`highest score:${highest_score}`, 240, 50);
	replayRaf = window.requestAnimationFrame(drawReplayIcon);
}
	
function coins(x, y, magic) {
	this.tlx = x;
	this.tly = y;
	this.magic = magic;
	this.width = 30;
	this.height = 30;
	this.color = "yellow";
	this.img = new Image();
	this.draw = function() {
		this.img.src = imgarray[index];
		ctx.drawImage(this.img, this.tlx, this.tly, 30, 30);
		index = index + 1;
		if (index == imgarray.length) {
			index = 0;
		}
	}
}

function obstacle(tlx,tly,width,height) {
	this.tlx = tlx;
	this.tly = tly;
	this.width = width;
	this.height = height;
	this.draw = function() {
		ctx.fillRect(this.tlx, this.tly, this.width, this.height);
	}
};

var ball = {
  x: 100,
  y: 300,
  vx: 0,
  vy: 0,
  radius: 25,
  gravition: 1,
  acceleartion: 1,
  jump: true,
  color: 'black',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.moveTo(0, 325);
    ctx.lineTo(800, 325);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

canvas.addEventListener('click', function(e) {
  if (!ball.jump) {
  	ball.jump = true;
  }
});

canvas.addEventListener('mousedown', function(e) {
  if (ball.jump && ball.vy != 0) {
  	ball.acceleartion = 0;
  }
});

canvas.addEventListener('mouseup', function(e) {
  if (ball.jump && ball.vy != 0) {
  	ball.acceleartion = 0.3;
  }
});

canvas.addEventListener('touchstart', function(e) {
  if (!ball.jump) {
  	ball.jump = true;
  }
});

canvas.addEventListener('touchmove', function(e) {
  if (ball.jump && ball.vy != 0) {
  	ball.acceleartion = 0;
  }
});

canvas.addEventListener('touchend', function(e) {
  if (ball.jump && ball.vy != 0) {
  	ball.acceleartion = 0.3;
  }
});

window.onclick = function(evt) {
var rect = canvas.getBoundingClientRect();
var x = (evt.clientX - rect.left) 
var y = (evt.clientY - rect.top)
if (x >= (canvas.width / 2 - 80 / 2) && x <= (canvas.width / 2 + 80 / 2) && y >= (canvas.height / 2 - 80 / 2) && y <= (canvas.height / 2 + 80 / 2)) {
	if (!stop) {
	window.cancelAnimationFrame(startRaf);
	draw();
	stop = true;
	highest_score = localStorage.getItem("highestscore");
	txt.innerHTML = "Stop";
	} else if (!resume) {
		window.cancelAnimationFrame(replayRaf);
		draw();
		resume = true;
		highest_score = localStorage.getItem("highestscore");
	} 
} else if (x >= 670 && x <= 694 && y >= 50 && y <= 74) {
		if (!pause) {
			pause = true;
		    window.cancelAnimationFrame(raf);
		} else {
			pause = false;
			window.requestAnimationFrame(draw);
		}
		
	}

}

function restoreGame() {
	score = 0;
	ball.radius = 25;
	ball.x = 100;
	ball.y = 300;
	ball.jump = false;
	obstaclearray = [];
	magiccoins = [];
	magnification = 1;
	coin_magnification = 1;
	resume = false;
	pause = false;
	over = false;
}

function createObstacle(obstaclearray) {
	var tly = Math.round(Math.random() * maxheight);
	tly = tly > minheight ? tly : minheight;
	var tlx = Math.round(Math.random() * maxgap);
	tlx = tlx > mingap ? tlx + 800 + Math.random() * 300 : mingap + 800 + Math.random() * 400;
	var width = Math.round(Math.random() * maxwidth);
	width = width > minwidth ? width : minwidth;
	obstaclearray.push(new obstacle(tlx, 325 - tly, width, tly));
}

function createMagicCoins(magiccoins) {
	var tly = Math.round(Math.random() * 300);
	tly = tly > maxheight ? tly : maxheight;
	var tlx = Math.round(Math.random() * maxgap);
	tlx = tlx > mingap ? tlx + 1000 + Math.random() * 300 : mingap + 1400 + Math.random() * 400;
	var magic = Math.random() > 0.5 ? 1 : -1; 
	magiccoins.push(new coins(tlx, tly, magic));
}

function collisionChecking(arr, i) {
	if (
		((((arr[i].tlx-ball.radius) <= ball.x) && (ball.x <= (arr[i].tlx + arr[i].width + ball.radius)))
			&& ((arr[i].tly <= ball.y) && (ball.y <= (arr[i].tly + arr[i].height))))
		||(Math.sqrt((arr[i].tlx - ball.x) * (arr[i].tlx - ball.x) + (arr[i].tly - ball.y) * (arr[i].tly - ball.y)) < ball.radius) 
		||(Math.sqrt((arr[i].tlx + arr[i].width - ball.x) * (arr[i].tlx + arr[i].width - ball.x) 
			+ (arr[i].tly - ball.y) * (arr[i].tly - ball.y)) < ball.radius)
		||(Math.sqrt((arr[i].tlx - ball.x) * (arr[i].tlx - ball.x) + (arr[i].tly + arr[i].height - ball.y) 
			* (arr[i].tly + arr[i].height - ball.y)) < ball.radius)
		||(Math.sqrt((arr[i].tlx + arr[i].width - ball.x) * (arr[i].tlx + arr[i].width - ball.x) + (arr[i].tly+arr[i].height - ball.y) 
			* (arr[i].tly + arr[i].height - ball.y)) < ball.radius)) {
		return false;
	} else {
		return true;
	}
}

function draw() {
	
	score += 1 * magnification * coin_magnification;
	if (score % 1000 == 0) {
		magnification++;
	}
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawPauseIcon();
	ball.draw();
	ctx.font = '24px serif';
	ctx.textBaseline = 'hanging';
	ctx.strokeText(score, 700, 50);
	highest_score = Math.max(highest_score, score);
	ctx.strokeText(highest_score, 0, 50);

	if (obstaclearray.length == 0) {
		var count = Math.round(Math.random() * maxnumber);
		count = count > 2 ? count : 2;
		while (count-- > 0) {
			createObstacle(obstaclearray);
		}
	}

	if (magiccoins.length == 0) {
		var count = Math.round(Math.random() * maxnumber);
		count = count > 2 ? count : 2;
		while (count-- > 0) {
			createMagicCoins(magiccoins);
		}
	}

	for (var j = 0; j < magiccoins.length; j++) {
		if (magiccoins[j].tlx + magiccoins[j].width < 0) {
			magiccoins.splice(j, 1);
			createMagicCoins(magiccoins);
		} else {
			//collision checking
			var valid = collisionChecking(magiccoins, j);
			if (!valid) {
				var step = magiccoins[j].magic > 0 ? 1 : -1;
				ball.y += step;
				ball.radius += step;
				coin_magnification += step;
				magiccoins.splice(j, 1);
			} else {
				magiccoins[j].draw();
				magiccoins[j].tlx -= (magnification + 2);
			}
		}
	}

	for (var i = 0; i < obstaclearray.length; i++) {
		if (obstaclearray[i].tlx + obstaclearray[i].width < 0) {
			obstaclearray.splice(i, 1);
			var last_obstacle = obstaclearray[obstaclearray.length - 1];
			createObstacle(obstaclearray);
		} else {
			//collision checking
			var valid = collisionChecking(obstaclearray, i);
			obstaclearray[i].draw();
			obstaclearray[i].tlx -= (magnification + 2);
			if (!valid) {
				over = true;
			}
		}
	}
	
    if (ball.jump) {
		ball.vy += ball.acceleartion;
		ball.y += ball.vy;
		if (ball.y + ball.vy < 100) {
			ball.vy = 0;
			ball.acceleartion = 0.3;
		}
		if (ball.y + ball.vy > 300) {
			ball.vy = -20;
			ball.y = 300;
			ball.acceleartion = 0.8;
			ball.jump = false;
		}
	}
	if (over) {
		window.cancelAnimationFrame(raf);
		drawReplayIcon();
		restoreGame();
		localStorage.setItem('highestscore', highest_score);
		return;
	} else {
		raf = window.requestAnimationFrame(draw);
	}
  	
}
drawStartIcon();
}




