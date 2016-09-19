

var Grid = function(x,y, rows, cols, width, height){
	var myGrid = this;
	
	myGrid.x = x;
	myGrid.y = y;
	myGrid.rows = rows;
	myGrid.cols = cols;
	myGrid.width = width;
	myGrid.height = height;
	
	myGrid.simulationSwitch = false;
	
	myGrid.currentTime = 0;
	myGrid.speed = 400;
	
	myGrid.background = 'white';
	myGrid.foreground = 'black';
	
	myGrid.cellColor = 'green';
	
	myGrid.cells = [];
	
	// Creating cells in the grid.
	var initialize = function(){
		console.log("fgh " +myGrid);
		for(var i = 0; i < rows*cols; i++){
			(function(){
				var x = i % cols;
				var y = Math.floor(i / cols);
				myGrid.cells.push(new Cell(x,y, myGrid));
			})();
		}
	}
	
	// Getting a cell at a particular coordinate.
	myGrid.getCell = function(x, y){
		x = (cols + x) % cols;
		y = (rows + y) % rows;
		return myGrid.cells[x+y*cols];
	};
	
	// Game state for each iteration
	myGrid.update = function(engine, delta){
		// Find the cells that need to die.
		if(!myGrid.simulationSwitch) return;
		myGrid.currentTime += delta;
		if(myGrid.currentTime < myGrid.speed) return;
		
		var cellsToDie = myGrid.cells.filter(function(c){
			return c.shouldDie();
		});
		
		// Find the cells that should be born.
		var cellsToBeBorn = myGrid.cells.filter(function(c){
			return c.shouldBeBorn();
		});
		
		cellsToDie.forEach(function(c){
			c.isAlive = false;
		});
		
		cellsToBeBorn.forEach(function(c){
			c.isAlive = true;
		});
		
		myGrid.currentTime = 0;
	};
	
	myGrid.draw = function(ctx, delta){
		
		ctx.save();
		ctx.translate(x,y);
		
		ctx.fillStyle = myGrid.background;
		ctx.fillRect(0, 0, cols * width, rows * height);
		
		// Drawing Grid Shape
		ctx.fillStyle = myGrid.foreground;
		var currX = 0;
		console.log(x, y, currX);
		for(var i = 0;i < cols;i++){
			ctx.beginPath();
			ctx.moveTo(currX,0);
			ctx.lineTo(currX, rows*height);
			ctx.closePath()
			ctx.stroke();
			currX  += width;
		}
		var currY = 0;
		for(var j = 0; j < rows; j++){
			ctx.beginPath();
			ctx.moveTo(0, currY);
			ctx.lineTo(cols*width, currY);
			ctx.closePath();
			ctx.stroke();
			currY += height;
		}
		
		//Drawing Cells
		ctx.fillStyle = myGrid.cellColor;
		var livingCells = myGrid.cells.filter(function(cell){
			return cell.isAlive;
		}).forEach(function(cell){
			ctx.fillRect(cell.x * width, cell.y * height, width, height);
		});
		ctx.restore();
	};
	initialize();
	return myGrid;
};