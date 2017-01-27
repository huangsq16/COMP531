
var buildings = new Array();
var distance  = 0;

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Clean the canvas before drawing
	c.clearRect(0,0,canvas.width,canvas.height);

	// Create the ground
	var floor = canvas.height / 2;
	var grad = c.createLinearGradient(0, floor, 0, canvas.height);
	grad.addColorStop(0, "yellow");
	grad.addColorStop(1, "black");
	c.fillStyle = grad;
	c.fillRect(0, floor, canvas.width, canvas.height);

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3;
	var windowHeight = 5, windowWidth = 3;

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'];

	//build a building
	var build = function() { 
		var x0 = Math.random() * canvas.width;
		var blgWidth = (windowWidth + windowSpacing) * Math.floor(Math.random() * 10);
		var blgHeight = Math.random() * canvas.height / 2;

		c.fillStyle= blgColors[ Math.floor(Math.random() * blgColors.length)];
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight);

		buildings.push({x:x0, y:floor - blgHeight, width:blgWidth, height: blgHeight, style: c.fillStyle});
		c.fillStyle = "yellow";
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);
			}
		}
	}

	// draw sun
	c.fillStyle = "yellow";
	c.beginPath();
	c.arc(distance % canvas.width, 100, 40, 0, 2 * Math.PI);
	c.fill();

	// draw buildings
	buildings.forEach(function(element) {
		c.fillStyle = element.style;
		c.fillRect(element.x, element.y, element.width, element.height);
		c.fillStyle = "yellow";
		for (var y = floor - floorSpacing; y > floor - element.height; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < element.width - windowWidth; x += windowSpacing + windowWidth) {
				var ran = Math.random();
				if (ran > 0.5) {
					c.fillRect(element.x + x, y - windowHeight, windowWidth, windowHeight);
				}
			}
		}
	});

	//draw car, the reason we draw car last is because that car is in front of buildings
	c.fillStyle = "black";
	c.fillRect(distance % canvas.width, canvas.height / 2 - 40, 60, 40);

	distance += 20;
	
	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"));
	document.getElementById("build").onclick = app.build;
	var timer = setInterval(function() {
		createApp(document.querySelector("canvas"));
	}, 1000);
	
	window.onclick = function(event) {
		var x = event.clientX;
		var y = event.clientY;
		buildings.forEach(function(element) {
			if (x >= element.x && x <= element.x + element.width && y >= element.y && y <= element.y + element.height) {
				element.y -= 10;
				element.height += 10;
			}
		});
	}
}


