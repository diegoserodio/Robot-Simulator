let agent;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	agent = new Agent(windowWidth/2, windowHeight/2, 60, 10);
}

function draw() {
	background(0);
	agent.move(100, 0);
}

function drawCircuit() {
	stroke(255);
	strokeWeight(4);
	let r = 100;
	for(let i = 0; i < 2*PI; i+=0.01){
		let x = windowWidth/2+r*cos(i);
		let y = windowHeight/2+r*sin(i);
		point(x, y);
	}
}
