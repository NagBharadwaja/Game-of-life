window.requestAnimationFrame = window.requestAnimationFrame ||
							   window.webkitRequestAnimationFrame ||
							   window.mozRequestAnimationFrame ||
							   window.oRequestAnimationFrame ||
							   window.msRequestAnimationFrame;
							   
							   
// Container using Revealing Module Pattern.
// Here, I am revealing the variable 'life'.
var Game = function(canvasId){
	var life = this;
	
	// Canvas and drawing context of the game.
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');
	life.canvas = canvas;
	
	life.background = 'black';
		
	life.running = false;
	
	life.isDebug = true;
	
	life.actors = [];
	
	
	life.clear = function(){
		ctx.fillStyle = life.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	life.update = function(delta){
		life.actors.forEach(function(a){
			a.update(life, delta);
		});
	};
	
	life.draw = function(delta){
		life.actors.forEach(function(a){
			a.draw(ctx, delta);
		});
	};
	
	// Frames Per Second.
	life.drawFps = function(delta){
		var seconds = delta/1000;
		var fps = 1/seconds;
	};
	
	// Starts the game.
	life.start = function(){
		life.running = true;
		
		var lastTime = Date.now();
		(function mainLoop(){
			if(!life.running)	return;
			
			// Schedules mainLoop() to be called.
			// Requests the browser to to call mainLoop() to update an animation before the next repaint.
			window.requestAnimationFrame(mainLoop);
			
			// Current time in milliseconds
			var current = Date.now();			
			// Time elapsed in milliseconds since the last frame
			var elapsed = current - lastTime;
			
			// Clear
			life.clear();
			// Update
			life.update(elapsed);
			// Draw
			life.draw(elapsed);
			
			if(life.isDebug){
				life.drawFps(elapsed);
			}
			
			lastTime = current;
		})();
	};
	
	return life;
};

// I get 'life' back
var game = new Game("game");

// Creating a grid
var grid = new Grid(0, 0, Math.floor(600/20), Math.floor(800/20), 20, 20);

game.canvas.addEventListener('click', function(event){
	var gridX = Math.floor(event.offsetX / grid.width);
	var gridY = Math.floor(event.offsetY / grid.height);
	
	grid.getCell(gridX, gridY).isAlive = true;
});

// Turning ON/OFF the update
window.addEventListener('keydown', function(){
	grid.simulationSwitch = !grid.simulationSwitch;
});


// Pushing the grid (and cells in the grid) onto the game (life).
game.actors.push(grid);

game.start();