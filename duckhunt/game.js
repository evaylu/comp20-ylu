function draw() {
	canvas = document.getElementById("game");
	// Check if canvas is supported on browser
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");

		img = new Image();
        img.src = "assets/duckhunt.png";
        //why second time of onload?
        img.onload = function(){
            init();
        };               
	}
	else {
	    alert('Sorry, canvas is not supported on your browser!');
	}
}


function init() {
    //The tree
    ctx.drawImage(img, 5, 273, 80, 120, 5, 5, 310, 490);
                
    //The birds
    ctx.drawImage(img, 0, 115, 35, 35, 200, 0, 90, 90);//purple
    ctx.drawImage(img, 300, 155, 35, 35, 350, 150, 90, 90);//red-left
    ctx.drawImage(img, 260, 155, 35, 35, 550, 250, 90, 90);//red-right
    ctx.drawImage(img, 170, 118, 35, 35, 650, 100, 90, 90);//green1
    ctx.drawImage(img, 210, 190, 35, 35, 680, 350, 90, 90);//up

    //The dirt road and bushes
    ctx.drawImage(img, 60, 700, 750, 165, 0, 350, 800, 250);

    //The dog
    ctx.drawImage(img, 0, 0, 60, 45, 300, 450, 180, 135);
}