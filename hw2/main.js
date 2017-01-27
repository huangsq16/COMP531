// load images for each card
var img1_set = [
	"http://img.hb.aicdn.com/08653c6e238c66f8e04a40abab5f6992f544856e5172a-2exdOm_sq320",
	"http://img.hb.aicdn.com/4a79979e018dfe18c3c9e85b766a324dd7ca6861d3446-svbEYK_sq320", 
	"http://img.hb.aicdn.com/a823a158ef8c1b22bfa56bc1f66289aeb1dbcf6431813-EZCHgH_sq320"
];
var img2_set = [
	"http://img.hb.aicdn.com/7a4c492eb99dbaf05c2a4fbf14534153679b0a3059da3-5yxn2H_sq320",
	"http://img.hb.aicdn.com/e8502c35e3decbb3d843b51ac9fc51ff73d6e5a8cb9cb-XdlFrD_sq320",
	"http://img.hb.aicdn.com/8a00d52c0a2cc4367c8ed99aa891a1a0fc597882ba26-YvNH9V_sq320"
];
var img3_set = [
	"http://img.hb.aicdn.com/e2aedded6a535527659b2a90f8a8de3c17f22922167ef-bvr6yk_sq320", 
	"http://img.hb.aicdn.com/597f37992eabd3f9f671688c52765c339bb3e253144a4-gn46Li_sq320",
	"http://img.hb.aicdn.com/42de54a14b6af04fce68ac39c8a05fa9c9ba335117335-rS4y9O_sq320"
];
var img4_set = [
	"http://img.hb.aicdn.com/f40a62cfb124016981ee01de73e8ed60ded6323c90a5-uqI3pU_sq320",
	"http://img.hb.aicdn.com/16705b65f89d004bdc4f4070d2b9ca5d54ca33a776a2a-X247sS_sq320",
	"http://img.hb.aicdn.com/2143a765ffc5c550e73754d011fa734bbead516abe69-RVfeJc_sq320"
];
var img5_set = [
	"http://img.hb.aicdn.com/acf2ec6d6a0fe89c8b59c7ff47a9ab8e589d526d104c7-ryy7qB_sq320",
	"http://img.hb.aicdn.com/c32fed0ad8008a024525f9c9dcddc0951c34c0389098-NrM5DZ_sq320",
	"http://img.hb.aicdn.com/547869289dd756c8198f25ee162d329852eb57fc17d33-ruFFuw_sq320"
];
var img6_set = [
	"http://img.hb.aicdn.com/e4f2461eb90c995e1d90ae843f519e5491a4e16de2bc-t6o4vk_sq320",
	"http://img.hb.aicdn.com/92f61753e199b6c6205e2519baa80235af85803013462-a4wSTD_sq320",
	"http://img.hb.aicdn.com/566a4d2f1ae4b55208c05ed33d9fd6a4197da1de1929f-hnwwRq_sq320"
];

window.onload = function() {

	//cache element
	var img1 = document.getElementById("img1");
	var img2 = document.getElementById("img2");
	var img3 = document.getElementById("img3");
	var img4 = document.getElementById("img4");
	var img5 = document.getElementById("img5");
	var img6 = document.getElementById("img6");
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	var btn3 = document.getElementById("btn3");
	var btn4 = document.getElementById("btn4");
	var btn5 = document.getElementById("btn5");
	var btn6 = document.getElementById("btn6");

	//set interval(itv) for each card
	var itv1 = setInterval(function() {
		loadimages("img1");
	}, 5000);
	var itv2 = setInterval(function() {
		loadimages("img2");	
	}, 4000);
	var itv3 = setInterval(function() {
		loadimages("img3");	
	}, 3000);
	var itv4 = setInterval(function() {
		loadimages("img4");		
	}, 5000);
	var itv5 = setInterval(function() {
		loadimages("img5");		
	}, 3000);
	var itv6 = setInterval(function() {
		loadimages("img6");		
	}, 5000);

	//set click event listener for each button
	btn1.addEventListener("click", function() {
		button_clicked("btn1");
	});
	btn2.addEventListener("click", function() {
		button_clicked("btn2");
	});
	btn3.addEventListener("click", function() {
		button_clicked("btn3");
	});
	btn4.addEventListener("click", function() {
		button_clicked("btn4");
	});
	btn5.addEventListener("click", function() {
		button_clicked("btn5");
	});
	btn6.addEventListener("click", function() {
		button_clicked("btn6");
	});

	/*  Implement click event funtion for button
		Function will check whether user want to stop or resume interval,
		and do coresponding operation.
	*/
	function button_clicked(button_id) {
		var btn_text = document.getElementById(button_id).innerHTML;
		if (btn_text == "Stop") {
			if (button_id == "btn1") {
				clearInterval(itv1);
			} else if (button_id == "btn2") {
				clearInterval(itv2);
			} else if (button_id == "btn3") {
				clearInterval(itv3);
			} else if (button_id == "btn4") {
				clearInterval(itv4);
			} else if (button_id == "btn5") {
				clearInterval(itv5);
			} else if (button_id == "btn6") {
				clearInterval(itv6);
			}
			document.getElementById(button_id).innerHTML = "Start";
		} else if (btn_text == "Start") {
			if (button_id == "btn1") {
				itv1 = setInterval(function() {
					loadimages("img1");
				}, Math.floor(Math.random()*5000));
			} else if (button_id == "btn2") {
				itv2 = setInterval(function() {
					loadimages("img2");	
				}, Math.floor(Math.random()*5000));
			} else if (button_id == "btn3") {
				itv3 = setInterval(function() {
					loadimages("img3");	
				}, Math.floor(Math.random()*5000));
			} else if (button_id == "btn4") {
				itv4 = setInterval(function() {
					loadimages("img4");		
				}, Math.floor(Math.random()*5000));
			} else if (button_id == "btn5") {
				itv5 = setInterval(function() {
					loadimages("img5");		
				}, Math.floor(Math.random()*5000));
			} else if (button_id == "btn6") {
				itv6 = setInterval(function() {
					loadimages("img6");		
				}, Math.floor(Math.random()*5000));
			}
			document.getElementById(button_id).innerHTML = "Stop";
		}
	}

	// load images for each img element. The idx is random.
	function loadimages(img_id) {
		if (img_id == "img1") {
			img1.src = img1_set[Math.floor(Math.random()*img1_set.length)];
		} else if (img_id == "img2") {
			img2.src = img2_set[Math.floor(Math.random()*img2_set.length)];
		} else if (img_id == "img3") {
			img3.src = img3_set[Math.floor(Math.random()*img3_set.length)];
		} else if (img_id == "img4") {
			img4.src = img4_set[Math.floor(Math.random()*img4_set.length)];
		} else if (img_id == "img5") {
			img5.src = img5_set[Math.floor(Math.random()*img5_set.length)];
		} else if (img_id == "img6") {
			img6.src = img6_set[Math.floor(Math.random()*img6_set.length)];
		} 
	}
}




