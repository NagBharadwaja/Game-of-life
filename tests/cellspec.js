/// Jasmine Test Runner

describe("A cell", function(){
	var cell, grid;	
	beforeEach(function(){
		grid = new Grid(0, 0, Math.floor(600/20), Math.floor(800/20), 20, 20);
		cell = new Cell(100, 71, grid);
		cell.neighbors = cell.getNeighbors();
	});
	
	it("is defined", function(){
		expect(Cell).toBeDefined();
	});
	
	it("has 8 neighbors", function(){
		var neighbors = cell.getNeighbors();
		expect(neighbors).toBeTruthy();	
		expect(neighbors.length).toBe(8);
	});
	
	it("is dead by default", function(){
		expect(cell.isAlive).toBe(false);
	});
	
	it("should die if it has less than 2 or more than 3 neighbors", function(){
		cell.neighbors = cell.getNeighbors();
		cell.neighbors[0].isAlive = true;
		expect(cell.shouldDie()).toBe(true);
	});
	
	it("should revive if a cell has 2 or 3 live neighbors", function(){
		cell.neighbors[0].isAlive = true;
		cell.neighbors[1].isAlive = true;		
		expect(cell.shouldDie()).toBe(false);
		cell.neighbors[2].isAlive = true;
		expect(cell.shouldDie()).toBe(false);
	});
	
	it("should die if a cell has more than 3 live neighbors", function(){
		cell.neighbors[0].isAlive = true;
		cell.neighbors[1].isAlive = true;
		cell.neighbors[2].isAlive = true;
		cell.neighbors[3].isAlive = true;
		expect(cell.shouldDie()).toBe(true);
	});
	
	it("if a dead cell has 3 live neighbors, it becomes a live cell", function(){
		cell.neighbors[0].isAlive = true;
		cell.neighbors[1].isAlive = true;
		cell.neighbors[2].isAlive = true;
		expect(cell.shouldBeBorn()).toBe(true);
	});
	
});