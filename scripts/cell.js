

var Cell = function(x, y, grid){
	var myCell = this;
	myCell.x = x;
	myCell.y = y;
	myCell.grid = grid;
	
	/*myCell.neighbors = [myCell.grid.getCell(x-1, y-1),
						myCell.grid.getCell(x-1, y),
						myCell.grid.getCell(x-1, y+1),
						myCell.grid.getCell(x, y-1),
						myCell.grid.getCell(x, y+1),
						myCell.grid.getCell(x+1, y-1),
						myCell.grid.getCell(x+1, y),
						myCell.grid.getCell(x+1, y+1),
						];*/
	
	myCell.isAlive = false;
	
	myCell.getNeighbors = function(){
		return [myCell.grid.getCell(x-1, y-1),
						myCell.grid.getCell(x-1, y),
						myCell.grid.getCell(x-1, y+1),
						myCell.grid.getCell(x, y-1),
						myCell.grid.getCell(x, y+1),
						myCell.grid.getCell(x+1, y-1),
						myCell.grid.getCell(x+1, y),
						myCell.grid.getCell(x+1, y+1),
						];
	};
	
	myCell.shouldDie = function(){
		// Filters the elements we want to keep
		var livingNeighbors = myCell.getNeighbors().filter(function(c){
			return c.isAlive;
		});
		// alert("dsfg" + livingNeighbors);
		if(livingNeighbors.length < 2){
			return true;
		}
		if(livingNeighbors.length > 3){
			return true;
		}
		return false;
	};
	
	myCell.shouldBeBorn = function(){
		var livingNeighbors = myCell.getNeighbors().filter(function(c){
			return c.isAlive;
		});
		if(livingNeighbors.length === 3){
			return true;
		}
		return false;
	};
	
	return myCell;
};