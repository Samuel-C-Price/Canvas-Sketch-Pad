(function() {
	
	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimaitonFrame ||
					function (callback) {
					 	window.setTimeout(callback, 1000/60);
					};
	})();

	// Set up the canvas
	var canvas = document.getElementById("sketch-canvas");
	var ctx = canvas.getContext("2d");
	var color = $(".selected").css("background-color");

	// Set up the UI
	var sketchImage = document.getElementById("sketch-image");
	var clear = document.getElementById("clearBtn");
	var save = document.getElementById("saveBtn");
	//Size buttons 
	var small = document.getElementById("smallBtn");
	var medium = document.getElementById("mediumBtn");
	var large = document.getElementById("largeBtn");
	var xlarge = document.getElementById("xlargeBtn");
	var fill = document.getElementById("fillBtn");

	clear.addEventListener("click", function (e) {
		$(this).siblings().removeClass("selected");
	  	//Select clicked element
	  	$(this).addClass("selected");
		clearCanvas();
		sketchImage.setAttribute("src", "");
	}, false);

	save.addEventListener("click", function (e) {
		var dataUrl = canvas.toDataURL();
		sketchImage.setAttribute("src", dataUrl);
	}, false);

	// Setting the size of the strokes on the canvas. 
	small.addEventListener("click", function(e){
	  $(this).siblings().removeClass("selected");
	  //Select clicked element
	  $(this).addClass("selected");
		ctx.lineWidth = 2;
	}, false);
	medium.addEventListener("click", function(e){
		$(this).siblings().removeClass("selected");
	  	//Select clicked element
	  	$(this).addClass("selected");
		ctx.lineWidth = 10;
	}, false);
	large.addEventListener("click", function(e){
		$(this).siblings().removeClass("selected");
	  	//Select clicked element
	  	$(this).addClass("selected");
		ctx.lineWidth = 20;
	}, false);
	xlarge.addEventListener("click", function(e){
		$(this).siblings().removeClass("selected");
	  	//Select clicked element
	  	$(this).addClass("selected");
		ctx.lineWidth = 40;
	}, false);
	fill.addEventListener("click", function(e){
		$(this).siblings().removeClass("selected");
	  	//Select clicked element
	  	$(this).addClass("selected");
		ctx.lineWidth = 2000;
	}, false);

	// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var lastPos = mousePos;
	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	}, false);

	// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}
	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}
	// function getSize(size){
	// 	ctx.lineWidth = size;
	// }
	//When clicking on control list items
	$(".controls").on("click", "li", function(){
	  //Deselect sibling elements
	  $(this).siblings().removeClass("selected");
	  //Select clicked element
	  $(this).addClass("selected");
	  //cache current color
	  color = $(this).css("background-color");
	  });
	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			ctx.beginPath();
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.stroke();
			ctx.strokeStyle = color;
			lastPos = mousePos;
		}
	}
	function clearCanvas() {
		canvas.width = canvas.width;
	}
	// Allow for animation
	(function drawLoop () {
		requestAnimFrame(drawLoop);
		renderCanvas();
	})();

})();