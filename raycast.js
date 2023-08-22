const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_CLOS = 15;

const WINDOW_WIDTH = MAP_NUM_CLOS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

class Map {
    constructor() {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    render() {
        for (var y = 0; y < MAP_NUM_ROWS; y++){
            for (var x = 0; x < MAP_NUM_CLOS; x++){
                var tildeX = x * TILE_SIZE;
                var tildeY = y * TILE_SIZE;
                var tildeColor = this.grid[y][x] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tildeColor);
                rect(tildeX, tildeY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

class Player{
    constructor() {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 3;
        this.turnDirection = 0; // -1 if left +1 if right
        this.walkDirection = 0; // -1 if back +1 if front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 2.0;
        this.rotationSpeed = 2 * (Math.PI / 180);
    }
    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        
        var moveStep = this.walkDirection * this.moveSpeed;
        this.x += 
    }
    render() {
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(this.x, this.y, 
            this.x + Math.cos(this.rotationAngle) * 30,
            this.y + Math.sin(this.rotationAngle) * 30);
    }
}

var grid = new Map();
var player = new Player();

function keyPressed() {
    if (keyCode == UP_ARROW){
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW){
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = -1;
    }
}

function keyReleased() {
    if (keyCode == UP_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW){
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = 0;
    }
}

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    player.update();
    // update game obj before next frame
} 

function draw() {
    update();
    grid.render();
    player.render();
}
